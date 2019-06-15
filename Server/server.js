var express = require('express');
var firebase = require('firebase');
var app = express();

// app.use(express.static(__dirname + '/public'));
var server = app.listen(3000);
var io = require('socket.io').listen(server);

// FUNCIONES
// NUEVA RESERVA
function nueva_reservaBD(datos_reserva,id){
    var reservasRealizadasDB = firebase.database().ref('locales/0/citas/'+id);
    var reserva = reservasRealizadasDB.set({
        id: id,
        cliente: datos_reserva.cliente,
        dia: datos_reserva.dia,
        hora: datos_reserva.hora,
        nota: datos_reserva.nota,
        estado: 'pendiente'
    });
}

// CANCELAR RESERVA
function cancelar_reservaBD(id){
    var reservasRealizadasDB = firebase.database().ref('locales/0/citas/'+id);
    var cancelar = reservasRealizadasDB.set({});
}

// ACEPTAR RESERVA
function aceptar_reservaBD(id){
    var reservasRealizadasDB = firebase.database().ref('locales/0/citas/'+id);
    var cancelar = reservasRealizadasDB.update({
        estado: 'confirmada'
    });
}

// ACEPTAR RESERVA
function add_productoBD(datos_producto){
    var reservasRealizadasDB = firebase.database().ref('locales/0/inventario/'+datos_producto.id);
    var producto = reservasRealizadasDB.set({
        id: datos_producto.id,
        producto: datos_producto.producto,
        unidades: datos_producto.unidades,
        venta: datos_producto.venta
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
                    
                    // INFORMACION DEL INVENTARIO
                    socket.emit('inventario', JSON.stringify(local_info));

                    // CANCELAR CITA
                    socket.on('cancelar_reserva', function(data){
                        cancelar_reservaBD(data);
                        console.log('Reserva Cancelada con id: '+data);
                    });
                    
                    // CONFIRMAR RESERVA
                    socket.on('confirmar_reserva', function(data){
                        aceptar_reservaBD(data);
                        console.log('Reserva Aceptada con id: '+data);
                    });

                    // AÑADIR PRODUCTO A STOCK
                    socket.on('nuevo_producto', function(data){
                        var datos_producto = data;
                        add_productoBD(datos_producto);
                        console.log('Producto añadido: '+data.producto);
                    });
                }else if(userLoged.rol == 'client'){
                    // USUARIO LOGEADO COMO CLIENTE
                    socket.emit('rol_view', 'client');
                    socket.emit('all_local_info', JSON.stringify(local_info));

                    // REALIZA UNA RESERVA Y SE GUARDA EN FIREBASE
                    socket.on('new_reserva', function (data) {
                        var nueva_reserva = JSON.parse(data);
                        var reservas_longitud = local_info[0].citas.length;

                        // RESERVA REALIZADA
                        nueva_reservaBD(nueva_reserva,reservas_longitud);
                        console.log('Reserva realiza');
                    });
                }  

            });
                      
        });
    });
});