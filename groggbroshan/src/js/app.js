angular.module('groggbroshan', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/add', {
        templateUrl: 'partials/add-drink.html',
        controller: 'AddDrinkController as add'
      })
      .otherwise({
        redirectTo: '/',
        templateUrl: 'partials/main.html',
        controller: 'MainController as main'
      })
  });