var express = require('express');
var app = express();

// app.use(express.static(__dirname + '/public'));
var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log("New Conexion");
});