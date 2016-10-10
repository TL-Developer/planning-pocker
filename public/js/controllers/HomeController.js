angular.module('planning-pocker').controller('HomeController', ['$scope','$http', function($scope, $http, $state) {

  $scope.mesa = [];

  if(localStorage.getItem('usuario_pocker')){
    $scope.usuario = JSON.parse(localStorage.getItem('usuario_pocker'));
  }

  $scope.send_card = function(form) {
    socket.emit('send:card', form.card, $scope.usuario.name);
  }

  socket.on('send:card', function(card, name){
    console.log(card, name)


    $scope.$apply(function() {
      $scope.mesa.push({
        name: name,
        card: card
      });
    });

  });

}]);
