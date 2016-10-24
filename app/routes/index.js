var users_connected = 0;

module.exports = function(socket) {
  socket.on('send:user', function(data){
    users_connected++;
    console.log(data.user + ' entrou no infrapocker, total de infrapockers: ' + users_connected);
    socket.emit('send:user', data.user);
    socket.emit('send:users', data.user);
    socket.broadcast.emit('send:users', data.user);
  });

  socket.on('send:card', function(card, name){
    socket.emit('send:card', card, name);
    socket.broadcast.emit('send:card:upset', card, name);
  });

  socket.on('upset:card', function(){
    socket.emit('upset:card');
    socket.broadcast.emit('upset:card');
  });

  socket.on('limpar:mesa:geral', function(){
    socket.emit('limpar:mesa:geral');
    socket.broadcast.emit('limpar:mesa:geral');
  });
};
