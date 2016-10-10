
module.exports = function(app) {

  app.route('/login')
    .post((req, res) => {

      var user = req.body.user;
      app.get('io').on('connection', function(socket){
        console.log(user + ' entrou no pocker');

        app.get('io').emit('novoUsuario', user);

        socket.on('disconnect', function(){
          console.log(user + ' disconectou do pocker');
        });
      });
    });

};
