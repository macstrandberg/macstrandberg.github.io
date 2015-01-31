(function () {
  'use strict';

  angular
    .module('groggbroshan')
    .controller('AddDrinkController', ['$http', '$log', AddDrinkController]);

  function AddDrinkController($http, $log) {
    var vm = this;

    vm.ingredients = [];
    vm.newIngredient = '';

    vm.getAllDrinks = function () {
      $http.get('php/getAllDrinks.php').
        success(function (result) {
          vm.allDrinks = result;
        }).
        error(function (data, status, headers, config) {
          $log.error(data);
          $log.error(status);
          $log.error(headers);
          $log.error(config);

          vm.result = "Ett oväntat fel har påträffats. Var vänlig försök igen.";
        });
    }

    vm.addIngredient = function (ingredient) {
      vm.ingredients.push(ingredient);
      vm.newIngredient = '';
    }

    vm.addNewDrink = function (name, ingredients) {
      $http.post('php/postAddNewDrink.php', {name: name, ingredients: ingredients}).
        success(function (data, status, headers, config) {
          vm.getAllDrinks();

          $log.info('Ny drink tillagd');
          $log.info(data);
        }).
        error(function (data, status, headers, config) {
          $log.error(data);
          $log.error(status);
          $log.error(headers);
          $log.error(config);
        });
    }

    vm.getAllDrinks();
  }

}());