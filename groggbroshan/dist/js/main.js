(function () {
  'use strict';

  angular.module('groggbroshan', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/add', {
          templateUrl: 'partials/add-drink.php',
          controller: 'AddDrinkController as add'
        })
        .otherwise({
          redirectTo: '/',
          templateUrl: 'partials/main.html',
          controller: 'MainController as main'
        }); // $routeProvider
    }]); // .config
}()); // local scope
(function () {
  'use strict';

  angular
    .module('groggbroshan')
    .controller('MainController', ['$http', '$log', MainController]);

  function MainController($http, $log) {
    var vm = this; // bind 'this' to viewmodel so we always can access 'this'

    vm.ingredients = [];
    vm.returnedIngredients = [];
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
      $http.post('php/postRecipe.php', ingredient).
        success(function (result) {
          $log.debug(result);

          if (!result.drink) {
            vm.noResults = true;
            return;
          }

          vm.returnedDrinks = result.drink;

          for (var i = 0; i < result.ingredients.length; i++) {
            vm.returnedIngredients.push(result.ingredients[i][0].ingredients.split(',')); // a string is returned. split it up at every ',' and push the ingredient to the vm-array
          };
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
    };

    vm.addIngredient = function (ingredient) {
      vm.ingredients.push(ingredient);
      vm.newIngredient = '';
    };

    // vm.checkIfAllowed = function () {
    //   $http.get('php/getCheckIfAllowed.php').
    //     success(function (allowed) {
    //       if (!allowed) {
    //         vm.blocked = 'Åtkomst nekad.'
    //         return;
    //       } else {
    //       }
    //     }).
    //     error(function (data, status, headers, config) {
    //       $log.error(data);
    //       $log.error(status);
    //       $log.error(headers);
    //       $log.error(config);
    //     });
    // };

    vm.addNewDrink = function (name, ingredients) {
      $http.post('php/postAddNewDrink.php', {name: name, ingredients: ingredients}).
        success(function (data) {
          vm.getAllDrinks();
          vm.ingredients = [];
          vm.drinkName = '';
        }).
        error(function (data, status, headers, config) {
          $log.error(data);
          $log.error(status);
          $log.error(headers);
          $log.error(config);
        });
    }

    // vm.checkIfAllowed();
    vm.getAllDrinks();
  }

}());