angular.module('planning-pocker').controller('HomeController', ['$scope','$http', function($scope, $http, $state) {

  if(localStorage.getItem('usuario_pocker')){
    $scope.usuario = JSON.parse(localStorage.getItem('usuario_pocker'));
  }
}]);
