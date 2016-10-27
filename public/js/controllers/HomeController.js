angular.module('planning-pocker').controller('HomeController', ['$scope','$http', '$state', function($scope, $http, $state) {

  $scope.mesa = [];
  $scope.mesaAdmin = [];
  $scope.cards = ['1','2','3','4','5','6','7','8','9','10','20','100','oo'];
  $scope.users = [];
  $scope.isMesaAdmin = 'asdfasdf';

  if(localStorage.getItem('usuario_pocker')){

    $scope.usuario = JSON.parse(localStorage.getItem('usuario_pocker'));
    if($scope.usuario.name.search(/alex/i) === 0){
      $scope.isAdmin = 'admin';
    }

    $scope.send_card = function(card) {
      var cards_checked = document.querySelectorAll('.md-checked');

      if(cards_checked.length > 1){
        var total = 0;
        for(var i = 0; i < cards_checked.length; i++){
          var card_number = parseInt(cards_checked[i].innerText);
          total +=card_number;
        }
        socket.emit('send:card', total, $scope.usuario.name);
      }else {
        var card_number = parseInt(cards_checked[0].innerText);
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
        $scope.mesaAdmin.push({
          name: name,
          card: card
        });
        setTimeout(function(){
          document.querySelectorAll('.mesaGamers')[0].style.display = 'flex';
          console.log(document.querySelectorAll('.mesaGamers')[0].lastElementChild);
          document.querySelectorAll('.mesaGamers')[0].lastElementChild.style.display = 'block';
          document.querySelectorAll('.mesaGamers')[0].lastElementChild.classList.add('flipInY','animated');
        }, 100);
        setTimeout(function(){
          document.querySelectorAll('.mesaGamers')[0].children[0].classList.remove('flipInY','animated');
        }, 1000);
      });
    });

    socket.on('send:card:upset', function(card, name){
      $scope.$apply(function() {
        $scope.mesa.push({
          name: name,
          card: '#'
        });
        $scope.mesaAdmin.push({
          name: name,
          card: card
        });
      });
    });

    $scope.viraCartas = function(){
      socket.emit('upset:card');
    };

    socket.on('upset:card', function(){
      $scope.$apply(function() {
        var cards_mesa_gamers = document.querySelectorAll('.mesaGamers')[0].children;
        for(var i = 0; i < cards_mesa_gamers.length; i++){
          cards_mesa_gamers[i].classList.add('flipOutY','animated');
        }
        setTimeout(function(){
          document.querySelectorAll('.mesaGamers')[0].style.display = 'none';

          for(var j = 0; j < cards_mesa_gamers.length; j++){
            cards_mesa_gamers[j].classList.remove('flipOutY','animated');
          }


          var cards_mesa_admin = document.querySelectorAll('.mesaAdmin')[0].children;
          document.querySelectorAll('.mesaAdmin')[0].style.display = 'flex';
          for(var h = 0; h < cards_mesa_gamers.length; h++){
            cards_mesa_admin[h].classList.add('flipInY','animated');
          }
          $scope.mesa = [];
        },1000);
      });
    });

    $scope.limparMesaGeral = function(){
      socket.emit('limpar:mesa:geral');
    };

    socket.on('limpar:mesa:geral', function(){
      $scope.$apply(function() {
        document.querySelectorAll('.mesaAdmin')[0].children[0].classList.add('flipOutY','animated');

        setTimeout(function(){
          document.querySelectorAll('.mesaAdmin')[0].children[0].classList.remove('flipOutY','animated');
          $scope.mesa = [];
          $scope.mesaAdmin = [];
          // document.querySelectorAll('.mesaGamers')[0].style.display = 'flex';
          document.querySelectorAll('.mesaAdmin')[0].style.display = 'none';
          document.querySelectorAll('.mesaGamers')[0].style.display = 'none';
        }, 1000);
      });
    });

  }else {
    $state.go('login');
  }

  $scope.limpar = function(){
    $scope.mesa = [];
    $scope.mesaAdmin = [];
    clean_checks();
  };

  // Limpa checkeds
  function clean_checks(){
    var cards_checked = document.querySelectorAll('.md-checked');
    for(var i = 0; i < cards_checked.length; i++){
      cards_checked[i].classList.remove('md-checked');
    }
  };

  socket.on('send:users', function(user){
    $scope.$apply(function() {
      $scope.users.push(user);
    });
  });

}]);
