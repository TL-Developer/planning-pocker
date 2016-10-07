
module.exports = function(app) {

  app.route('/login')
    .post((req, res) => {
      var user = res.body;
      app.get('io').emit('novoUsuario', user);
    });

};
