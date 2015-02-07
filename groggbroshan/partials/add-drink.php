<?php
  define('ACCESS_ALLOWED', 1);
  include '../php/vars.php';
  if ($_SERVER['REMOTE_ADDR'] == $allowed_ip) {
?>
<div class="row">
  <div class="col-md-4 sidebar">
    <div class="row">
      <div class="col-md-12">
        <p class="lead">Lägg till grogg</p>

        <form class="form-horizontal" ng-submit="add.addIngredient(add.newIngredient)">
          <div class="form-group">
            <label class="col-md-3">Namn</label>
            <div class="col-md-9">
              <input type="text" class="form-control" ng-model="add.drinkName">
            </div>
          </div>

          <div class="form-group">
            <label class="col-md-3">Ingredienser</label>
            <div class="col-md-9">
              <input type="text" class="form-control" ng-model="add.newIngredient">
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-md-5">
              <ol>
                <li ng-repeat="listOfIngredients in add.ingredients">{{listOfIngredients}}</li>
              </ol>
            </div>

            <div class="col-xs-12 col-md-7">
              <div class="row">
                <div class="col-xs-12">
                  <button type="submit" class="btn btn-info pull-right">Lägg till ingrediens</button>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-12">
                  <button type="button" class="btn btn-success pull-right" ng-click="add.addNewDrink(add.drinkName, add.ingredients)">Lägg till grogg</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="col-md-8 main">
    <p class="lead visible-xs-block">Groggar i databasen</p>

    <div class="row">
      <div class="col-xs-12 col-md-4" ng-repeat="drink in add.allDrinks">
        <div class="card">
          <strong class="nameOfDrink">{{drink.drink_name}}</strong>
          <li ng-repeat="ingredient in drink.ingredients.split(',')">
            {{ingredient}}
          </li>
        </div>
      </div>
      <div class="clearfix visible-lg-block"></div>
    </div>
  </div>
</div>
<?php
} else {
  echo "<p class='lead'>Åtkomst nekad</p>";
}
?>