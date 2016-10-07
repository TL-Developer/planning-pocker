angular.module('planning-pocker', ['ui.router','ngMaterial']).config(function($stateProvider, $urlRouterProvider){

  $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      });

    $urlRouterProvider.otherwise('/');
});
