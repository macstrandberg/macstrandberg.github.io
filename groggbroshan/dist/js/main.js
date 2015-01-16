angular.module('groggbroshan', []);
(function () {
  'use strict';

  angular
    .module('groggbroshan')
    .controller('MainController', ['$log', MainController]);

  function MainController($log) {
    var vm = this;
    vm.database = [
      {
        img: './img/rum-coke.png',
        name: 'Rom och Cola',
        ingredients: ['rom', 'cola'],
        alternatives: ['pepsi', 'coke', 'coca cola', 'coca-cola']
      },
      {
        img: './img/irish-coffee.png',
        name: 'Irish coffee',
        ingredients: ['kaffe', 'whisky', 'farinsocker', 'grädde'],
        alternatives: ['socker']
      },
      {
        img: './img/vodka-redbull.png',
        name: 'Vodka Redbull',
        ingredients: ['vodka', 'redbull'],
        alternatives: ['energi drink', 'energidrink', 'energidricka']
      },
      {
        img: './img/jack-coke.png',
        name: 'Jack och Cola',
        ingredients: ['jack daniels', 'cola'],
        alternatives: ['whisky', 'pepsi', 'coke', 'coca cola', 'coca-cola']
      }
    ];

    vm.ingredients = [];
    vm.newIngredient = '';
    vm.searchString = '';

    vm.handleIngredients = function (ingredient) {
      vm.addIngredient(ingredient);
      vm.showRecipies(vm.ingredients);
    };

    vm.addIngredient = function (ingredient) {
      vm.ingredients.push(ingredient);
      vm.newIngredient = '';
    };

    vm.showRecipies = function (ingredient) {
      angular.forEach(vm.database, function (recipe) {
        for (var i = 0; i < ingredient.length; i++) {
          if (recipe.ingredients.indexOf(ingredient[i]) !== -1 || recipe.alternatives.indexOf(ingredient[i]) !== -1) {
            $log.debug('recipe found!');
            $log.debug(recipe);

            recipe.match = true;

            // function is currently finding a match for each ingredient.
            // fix: make sure function consider all ingredients in array from user input
            // before sending back a match
          }
        }
      });

      $log.debug(vm.database);
    };
  }

}());