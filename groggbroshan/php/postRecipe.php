<?php
include "vars.php";

$ingredients = json_decode(file_get_contents("php://input"));
$inQuery = implode(',', array_fill(0, count($ingredients), '?'));

try {
  $conn = new PDO("mysql:host=$host;dbname=$db;", $user, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $statement = $conn->prepare(
    "SELECT drinks.name
    FROM drinks
    INNER JOIN drinks_ingredients ON drinks.id = drinks_ingredients.drink_id
    INNER JOIN ingredients ON ingredients.id = drinks_ingredients.ingredient_id
    WHERE ingredients.name IN (" . $inQuery . ")"
  );
  $statement->execute($ingredients);
  $returnedDrink = $statement->fetchAll(PDO::FETCH_ASSOC);

  $statement = $conn->prepare(
    "SELECT ingredients.name
    FROM ingredients
    INNER JOIN drinks_ingredients ON ingredients.id = drinks_ingredients.ingredient_id
    INNER JOIN drinks ON drinks.id = drinks_ingredients.drink_id
    WHERE drinks.name = :drink"
  );
  for ($i = 0; $i < count($returnedDrink); $i++) {
    $statement->bindParam(':drink', $returnedDrink[$i]['name']);
    $statement->execute();
    $returnedIngredients[] = $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  echo json_encode(array(
    'drink' => $returnedDrink,
    'ingredients' => $returnedIngredients
  ));
} catch (PDOException $e) {
  echo 'PDO ERROR: ' . $e->getMessage() . "\n";
}