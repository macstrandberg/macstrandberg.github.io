<?php
define('ACCESS_ALLOWED', 1);
include "vars.php";

try {
  $conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $statement = $conn->prepare(
    "SELECT drinks.drink_name,
      GROUP_CONCAT(ingredients.ingredient_name ORDER BY ingredients.ingredient_name ASC SEPARATOR ', ') AS ingredients
    FROM drinks_ingredients
    INNER JOIN drinks ON drinks_ingredients.drink_id = drinks.id
    INNER JOIN ingredients ON drinks_ingredients.ingredient_id = ingredients.id
    WHERE drinks.id IN
    (
      SELECT drinks.id
      FROM drinks_ingredients
      INNER JOIN drinks ON drinks_ingredients.drink_id = drinks.id
      INNER JOIN ingredients ON drinks_ingredients.ingredient_id = ingredients.id
    )
    GROUP BY drinks.id"
  );
  $statement->execute();
  $returned = $statement->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($returned);
} catch (PDOException $e) {
  echo 'PDO ERROR: ' . $e->getMessage() . "\n";
}