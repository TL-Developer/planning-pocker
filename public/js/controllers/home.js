angular.module('planning-pocker').controller('HomeController', ['$scope','$http', function($scope, $http) {

  $scope.login = function(user){
    var usuario = {
      'user': user
    };
    $http.post('/login', usuario).then(function(){
      console.log('test');
    });
  }

  var socket = io();
  socket.on('novoUsuario', function(user){
    console.log(user + ' conectado');
  });

}]);
