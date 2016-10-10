var users_connected = 0;

module.exports = function(socket) {
  socket.on('send:user', function(data){
    users_connected++;
    console.log(data.user + ' entrou no infrapocker, total de infrapockers: ' + users_connected);
    socket.emit('send:user', data.user);
    // socket.broadcast.emit('novo:usuario', data.user);
  });
};
