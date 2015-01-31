(function () {
  'use strict';

  angular
    .module('groggbroshan')
    .controller('MainController', ['$http', '$log', MainController]);

  function MainController($http, $log) {
    var vm = this;

    vm.ingredients = [];
    vm.newIngredient = '';

    vm.handleIngredients = function (ingredient) {
      vm.addIngredient(ingredient);
      vm.showRecipies(vm.ingredients);
    };

    vm.addIngredient = function (ingredient) {
      vm.ingredients.push(ingredient);
      vm.newIngredient = '';
    };

    vm.showRecipies = function (ingredient) {
      vm.returnedDrinks = '';
      vm.returnedIngredients = '';

      $http.post('php/postRecipe.php', ingredient).
        success(function (result) {
          vm.result = true;
          vm.returnedDrinks = result.drink.name;
          vm.returnedIngredients = result.ingredients;
        }).
        error(function (data, status, headers, config) {
          $log.error(data);
          $log.error(status);
          $log.error(headers);
          $log.error(config);

          vm.result = "Ett oväntat fel har påträffats. Var vänlig försök igen.";
        });
    };
  }

}());