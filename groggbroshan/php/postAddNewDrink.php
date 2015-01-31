<?php
include "vars.php";

$input = json_decode(file_get_contents("php://input"));

try {
  $conn = new PDO("mysql:host=$host;dbname=$db;", $user, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $statement = $conn->prepare(
    "INSERT INTO drinks (name)
    VALUES (:drinkName);"
  );
  $statement->bindParam(':drinkName', $input->name);
  $statement->execute();
  $firstQuery = $statement->rowCount();

  for ($i = 0; $i < count($input->ingredients); $i++) {
    $statement = $conn->prepare(
      "INSERT INTO ingredients (name)
      VALUES (:ingredient);

      INSERT INTO drinks_ingredients (drink_id, ingredient_id)
      SELECT drinks.id, ingredients.id
      FROM drinks, ingredients
      WHERE drinks.name = :drinkName AND ingredients.name = :ingredient;"
    );
    $statement->bindParam(':drinkName', $input->name);
    $statement->bindParam(':ingredient', $input->ingredients[$i]);
    $statement->execute();
    $secondQuery[] = $statement->rowCount();
  }

  echo json_encode(array(
    'firstQuery' => $firstQuery,
    'secondQuery' => $secondQuery
  ));
} catch (PDOException $e) {
  echo 'PDO ERROR: ' . $e->getMessage() . "\n";
}