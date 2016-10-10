var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

io.on('connection', require('./app/routes/index'));

http.listen(app.get('port'), function(){
  console.log('Rodando na porta '+app.get('port'));
});
