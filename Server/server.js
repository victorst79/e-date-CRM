var express = require('express');
var firebase = require('firebase');
var app = express();

// app.use(express.static(__dirname + '/public'));
var server = app.listen(3000);
var io = require('socket.io').listen(server);

// FIREBASE CONFIG
var firebaseConfig = {
    apiKey: "AIzaSyA2w3M6RazrNteKGb0SoyaLuEG81xu7anA",
    authDomain: "e-date-1d93d.firebaseapp.com",
    databaseURL: "https://e-date-1d93d.firebaseio.com",
    projectId: "e-date-1d93d",
    storageBucket: "e-date-1d93d.appspot.com",
    messagingSenderId: "570681216054",
    appId: "1:570681216054:web:5cf494038585e6a2"
};

firebase.initializeApp(firebaseConfig);

var usuarios;
// GET USUARIOS FIREBASE
var ref_usuarios = firebase.database().ref();
ref_usuarios.child('usuarios').on("value", function(snapshot){
    usuarios = snapshot.val();
});

io.on('connection', function(socket){
    console.log("New Conexion");

});