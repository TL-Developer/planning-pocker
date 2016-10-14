angular.module('planning-pocker').controller('LoginController', ['$scope','$http','$state', function($scope, $http, $state) {

  $scope.usuario = {
    name: ''
  };

  localStorage.removeItem('usuario_pocker');

  $scope.login = function(form){
    var usuario = {
      'user': form.name
    };
    socket.emit('send:user', usuario);
  };

  socket.on('send:user', function(user){
    $scope.usuario = {
      name: user
    };
    var usuario_to_string = JSON.stringify($scope.usuario);
    localStorage.setItem("usuario_pocker", usuario_to_string);
    $state.go('home');
  });


}]);
