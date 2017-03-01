/* Importar as configurações do servidor */
var app = require('./config/server');

/* Parametrizar a porta de escuta*/
var server = app.listen(3000, function(){
  console.log('Servidor online')
});

/*var io = require('socket.io').listen(server);

app.set('io', io);

var participantes = [];

io.on('connection', function(socket){
    console.log('Usuário conectou');

    socket.on('disconnect', function(data){
        console.log('Usuario desconectou');
    });

    socket.on('msgParaServidor', function(data){
      socket.emit('msgParaCliente', { apelido: data.apelido, msg: data.msg });
      socket.broadcast.emit('msgParaCliente', { apelido: data.apelido, msg: data.msg });
    });

});*/
