var express = require('express');
var firebase = require('firebase');
var app = express();

// app.use(express.static(__dirname + '/public'));
var server = app.listen(3000);
var io = require('socket.io').listen(server);

// FUNCIONES
function nueva_reservaBD(cliente,dia,hora,nota){
    var reservasRealizadasDB = firebase.database().ref('locales/0/citas');
    var reserva = reservasRealizadasDB.push({
        cliente: cliente,
        dia: dia,
        hora: hora,
        nota: nota   
    });
}

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

// EVENTOS APP
var ref_usuarios = firebase.database().ref();
ref_usuarios.child('usuarios').on("value", function(snapshot){
    
    var usuarios = snapshot.val()
    io.on('connection', function(socket){
        // CONEXION NUEVA Y EMISION DE TODOS LOS USUARIOS DE FIREBASE
        console.log("New Conexion");
        socket.emit('usuarios',usuarios);

        socket.on('userLogin', function(data) {
            var userLoged = JSON.parse(data);
            console.log('Usuario identificado como '+ userLoged.user +', con rol '+ userLoged.rol);

            ref_usuarios.child('locales').on("value", function(snapshot){
                var local_info = snapshot.val();

                if(userLoged.rol == 'admin'){
                    // USUARIO LOGEADO COMO ADMINISTRADOR
                    socket.emit('rol_view', 'admin');
                    socket.emit('all_local_info', JSON.stringify(local_info));
                    
                }else if(userLoged.rol == 'client'){
                    // USUARIO LOGEADO COMO CLIENTE
                    socket.emit('rol_view', 'client');
                    socket.emit('all_local_info', JSON.stringify(local_info));
                    
                    socket.on('new_reserva', function (data) {
                        var nueva_reserva = JSON.parse(data);
                        
                        // firebase.database().ref('locales/0/citas').push({
                        //     cliente: nueva_reserva.user,
                        //     dia: nueva_reserva.fecha,
                        //     hora: nueva_reserva.hora,
                        //     nota: nueva_reserva.nota                            
                        // });
                        nueva_reservaBD(nueva_reserva.user, nueva_reserva.fecha, nueva_reserva.hora, nueva_reserva.nota);
                        console.log('Reserva realiza');

                    });
                }  

            });
                      
        });
    });
});