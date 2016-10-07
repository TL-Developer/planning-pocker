angular.module('planning-pocker').controller('HomeController', ['$scope','$http', function($scope, $http) {



  $scope.login = function(){
    var usuario = {
      'user':'tiago'
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
