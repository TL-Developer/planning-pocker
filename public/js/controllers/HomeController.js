angular.module('planning-pocker').controller('HomeController', ['$scope','$http', '$state', function($scope, $http, $state) {

  $scope.mesa = [];
  $scope.cards = ['1','2','3','4','5','6','7','8','9','10','20','100','oo'];

  if(localStorage.getItem('usuario_pocker')){

    $scope.usuario = JSON.parse(localStorage.getItem('usuario_pocker'));

    $scope.send_card = function(card) {
      var cards_checked = document.querySelectorAll('.ng-not-empty');

      if(cards_checked.length > 1){
        var total = 0;
        for(var i = 0; i < cards_checked.length; i++){
          var card_number = parseInt(cards_checked[i].defaultValue);
          total +=card_number;
        }
        socket.emit('send:card', total, $scope.usuario.name);
      }else {
        var card_number = parseInt(cards_checked[0].defaultValue);
        socket.emit('send:card', card_number, $scope.usuario.name);
      }
      clean_checks();
    };

    socket.on('send:card', function(card, name){
      $scope.$apply(function() {
        $scope.mesa.push({
          name: name,
          card: card
        });
      });

    });
  }else {
    $state.go('login');
  }

  $scope.limpar = function(){
    $scope.mesa = [];
    clean_checks();
  };


  // Limpa checkeds
  function clean_checks() {
    for(var i = 0; i < document.getElementsByTagName('input').length; i++){
      document.getElementsByTagName('input')[i].checked = false;
    }
  };

}]);
