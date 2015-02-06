<?php
include "vars.php";

$ingredients = json_decode(file_get_contents("php://input")); // import form data. works like $var = $_POST[]
$ingredientsCount = count($ingredients);
array_push($ingredients, $ingredientsCount); // in order for the execute-method to work properly, we have to add the array length to the ingredients-array
$inQuery = implode(',', array_fill(0, (count($ingredients) - 1), '?')); // ($ingredients - 1) since the length is also present in the array

try {
  $conn = new PDO("mysql:host=$host;dbname=$db;", $user, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // gets all drink names that only contains the specified ingredients
  $statement = $conn->prepare(
    "SELECT drinks.drink_name
    FROM drinks
    INNER JOIN drinks_ingredients ON drinks.id = drinks_ingredients.drink_id
    INNER JOIN ingredients ON ingredients.id = drinks_ingredients.ingredient_id
    WHERE ingredients.ingredient_name IN (" . $inQuery . ")
    GROUP BY drinks_ingredients.drink_id
    HAVING count(DISTINCT(drinks_ingredients.ingredient_id)) = ?"
  );

  $statement->execute($ingredients);

  $returnedDrink = $statement->fetchAll(PDO::FETCH_ASSOC);

  // gets all the ingredients from the specified drink(s)
  $statement = $conn->prepare(
    "SELECT GROUP_CONCAT(ingredients.ingredient_name ORDER BY ingredients.ingredient_name ASC SEPARATOR ',') AS ingredients
    FROM drinks_ingredients
    INNER JOIN drinks ON drinks_ingredients.drink_id = drinks.id
    INNER JOIN ingredients ON drinks_ingredients.ingredient_id = ingredients.id
    WHERE drinks.drink_name = :drink"
  );
  for ($i = 0; $i < count($returnedDrink); $i++) { // loop over all the returned drinks from the previous query
    $statement->bindParam(':drink', $returnedDrink[$i]['drink_name']);
    $statement->execute();
    $returnedIngredients[] = $statement->fetchAll(PDO::FETCH_ASSOC); // add them to an array
  }

  echo json_encode(array(
    'drink' => $returnedDrink,
    'ingredients' => $returnedIngredients
  ));

} catch (PDOException $e) {
  echo 'PDO ERROR: ' . $e->getMessage() . "\n";
}