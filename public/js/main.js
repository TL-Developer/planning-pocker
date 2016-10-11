angular.module('planning-pocker', ['ui.router','ngMaterial']).config(function($stateProvider, $urlRouterProvider){

  $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      });

    $urlRouterProvider.otherwise('/login');
});
