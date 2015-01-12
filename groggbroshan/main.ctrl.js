/* global angular, window */
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
        name: 'Rum and Coke',
        ingredients: ['rum', 'coke'],
        alternatives: ['pepsi', 'cola', 'coca cola', 'coca-cola']
      },
      {
        img: './img/irish-coffee.png',
        name: 'Irish coffee',
        ingredients: ['coffee', 'whisky', 'brown sugar', 'cream'],
        alternatives: ['sugar']
      },
      {
        img: './img/vodka-redbull.png',
        name: 'Vodka Redbull',
        ingredients: ['vodka', 'redbull'],
        alternatives: ['energy drink']
      },
      {
        img: './img/jack-coke.png',
        name: 'Jack and coke',
        ingredients: ['jack daniels', 'coke'],
        alternatives: ['whisky', 'pepsi', 'cola', 'coca cola', 'coca-cola']
      }
    ];
    
    vm.ingredients = [];
    vm.newIngredient = '';
    vm.searchString = '';
    
    vm.handleIngredients = function () {
      vm.addIngredient();
      vm.showRecipies();
    };
    
    vm.addIngredient = function () {
      vm.ingredients.push(vm.newIngredient);
      vm.newIngredient = '';
    };
    
    vm.showRecipies = function () {
      angular.forEach(vm.database, function (value, key) {
        if (value.ingredients.indexOf(vm.searchString) >= 0) {
          $log.info('found a recipe!');
          $log.info(value);
          
          value.match = true;
        }
      });
      
      $log.debug(vm.database);
    };
  }
  
}());