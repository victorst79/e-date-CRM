<template>
  <section>
    <!-- LOGIN COMPONENT -->
    <div id="login" v-if="stateApp == 'offline'">
      <div class="form-login container">
        <div class="row">
          <span class="col-12 text-center">
            <img src="../assets/e-date.png" alt="Logotipo E-Date" class="logo-edate">
          </span>
        </div>
        
        <md-card class="row">

          <md-card-header class="offset-2 col-8">
            <div class="md-title">Iniciar Sesion</div>
          </md-card-header>
          
          <md-field md-clearable class="offset-md-2 col-md-8 offset-1 col-10">
            <label>Usuario</label>
            <md-input v-model="user" @keypress.enter="login_app"></md-input>
          </md-field>

          <md-field class="offset-md-2 col-md-8 offset-1 col-10">
            <label>Contraseña</label>
            <md-input type="password" v-model="pass" @keypress.enter="login_app"></md-input>
          </md-field>

          <div class="col-12">
            <md-card-actions>
              <md-button class="boton-login" v-on:click="login_app">Login</md-button>
            </md-card-actions>
          </div>
            
        </md-card>
      </div>
    </div>
    <!-- FIN LOGIN COMPONENT -->

    <!-- CLIENTE COMPONENTE -->
    <div id="user" v-if="stateApp == 'client'">
      <h2 class="text-center titulo-local">{{data.local}}</h2>
      <md-card class="container">
        <md-card-header class="offset-2 col-8">
          <div id="citas">
            <!-- RESERVAR -->
            <div class="container" v-if="data.cita.pendiente == 'sin cita'">
              <section class="row">
                <div class="col-12">
                  <h3>Nueva Cita</h3>
                  <md-divider />
                  <h4 class="titulo-reserva">Dia: {{fecha}}</h4>
                  <md-datepicker class="calendario-picker row" v-model="fecha"/>
                  
                  <h4 class="titulo-reserva">Hora: {{hora}}</h4>
                  <div class="col-12 text-center botonera-horas">
                    <md-button class="md-primary" v-for="horas in horas_reservadas" v-bind:key="horas" v-on:click="set_hora(horas)">{{horas}}</md-button>
                  </div>

                  <h4>Nota:</h4>
                  <md-field>
                    <label></label>
                    <md-textarea v-model="nota" md-autogrow></md-textarea>
                  </md-field>

                  <div class="offset-11">
                    <md-button class="md-primary" v-on:click="reservar">Reservar</md-button>  
                  </div>                  
                </div>
              </section>
            </div>  
            <!-- RESERVADA -->
            <div v-if="data.cita.pendiente == 'reserva'">
              <section class="row">
                <div class="col-12">
                  <h3>Cita Reservada</h3>
                  <md-divider />
                  <h5>Tu cita sera revisada por un administrador, cuando sea confirmada recibiras una notificacion.</h5>
                </div>
              </section>
            </div>
            <!-- ACEPTADA -->
            <div v-if="data.cita.pendiente == 'confirmada'">
              <section class="row">
                <div class="col-12">
                  <h3>Cita Confirmada</h3>
                  <md-divider />
                  <h5>Tu cita ha sido revisada y confirmada por un administrador.</h5>
                </div>
              </section>
            </div>
          </div>
        </md-card-header>
      </md-card>
    </div>
    <!-- FIN CLIENTE COMPONENTE -->
    
    <!-- ADMIN COMPONENTE -->
    <div id="admin" v-if="stateApp == 'admin'">
      <h2 class="text-center titulo-local">{{data.local}} - Panel Administrador</h2>
      <md-card class="container">
        <section class="row">
          <div class="col-12">
            <div class="md-title text-center titulo-seccion">Citas Pendientes</div>
            <md-divider />
            <md-table>
              <md-table-row>
                <md-table-head>Cliente</md-table-head>
                <md-table-head>Dia</md-table-head>
                <md-table-head>Hora</md-table-head>
                <md-table-head>Nota Cliente</md-table-head>
                <md-table-head>Acciones</md-table-head>
              </md-table-row>
              <md-table-row v-for="pendiente in citas_pendientes" v-bind:key="pendiente">
                  <md-table-cell>{{pendiente.cliente}}</md-table-cell>
                  <md-table-cell>{{pendiente.dia}}</md-table-cell>
                  <md-table-cell>{{pendiente.hora}}</md-table-cell>
                  <md-table-cell>{{pendiente.nota}}</md-table-cell>
                  <md-table-cell>
                    <span v-on:click="confirmar_cita(pendiente)">
                      <md-icon class="aceptar-icono">done</md-icon>
                    </span>
                    <span v-on:click="cancelar_cita(pendiente)">
                      <md-icon class="cancelar-icono">clear</md-icon>
                    </span>                    
                  </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <div class="col-12">
            <div class="md-title text-center titulo-seccion">Citas Aceptadas</div>
            <md-divider />
            <md-table>
              <md-table-row>
                <md-table-head>Cliente</md-table-head>
                <md-table-head>Dia</md-table-head>
                <md-table-head>Hora</md-table-head>
                <md-table-head>Nota Cliente</md-table-head>
              </md-table-row>
              <md-table-row v-for="aceptada in citas_aceptadas" v-bind:key="aceptada">
                  <md-table-cell>{{aceptada.cliente}}</md-table-cell>
                  <md-table-cell>{{aceptada.dia}}</md-table-cell>
                  <md-table-cell>{{aceptada.hora}}</md-table-cell>
                  <md-table-cell>{{aceptada.nota}}</md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <div id="inventario" class="col-12">
            <div class="md-title text-center titulo-seccion">Inventario 
              <md-button class="md-icon-button" @click="showDialog = true">
                <md-icon>add</md-icon>
              </md-button>
            </div>
            <md-divider />
            <md-table>
              <md-table-row>
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Producto</md-table-head>
                <md-table-head>Unidades</md-table-head>
                <md-table-head>Precio de Venta</md-table-head>
              </md-table-row>
              <md-table-row v-for="item in inventario" v-bind:key="item">
                <md-table-cell md-numeric>{{item.id}}</md-table-cell>
                <md-table-cell>{{item.producto}}</md-table-cell>
                <md-table-cell>{{item.unidades}}</md-table-cell>
                <md-table-cell>{{item.venta}}</md-table-cell>
              </md-table-row>
          </md-table>          
          </div>         
        </section>
      </md-card>
    </div>
    <!-- FIN ADMIN COMPONENTE -->
    <!-- DIALOGS Y SNACKBARS -->
  <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Añadir nuevo producto</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="Stock">
          <h5>Rellena los campos para el nuevo producto</h5>
          <md-field>
            <label>Producto</label>
            <md-textarea v-model="nombre_producto" md-autogrow></md-textarea>
          </md-field>

          <md-field>
            <label>Unidades</label>
            <md-textarea v-model="unidades_producto" type="number" md-autogrow></md-textarea>
          </md-field>

          <md-field>
            <label>Precio de Venta</label>
            <md-textarea v-model="precio_producto" md-autogrow></md-textarea>
          </md-field>
          <small>Añadir el valor de moneda (€)</small>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Cancelar</md-button>
        <md-button class="md-primary" @click="showDialog = false" v-on:click="add_stock">Añadir</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- SNACKBAR LOGIN -->
    <md-snackbar :md-position="centered" :md-duration="false ? Infinity : 4000" :md-active.sync="showSnackbarLogin" md-persistent>
      <span>Has iniciado sesion como {{this.user}}.</span>
      <md-button class="md-primary" @click="showSnackbarLogin = false">Cerrar</md-button>
    </md-snackbar>

    <!-- SNACKBAR ERROR LOGIN -->
    <md-snackbar :md-position="centered" :md-duration="false ? Infinity : 4000" :md-active.sync="showSnackbarLoginError" md-persistent>
      <span>Error Inicio de sesion.</span>
      <md-button class="md-primary" @click="showSnackbarLoginError = false">Cerrar</md-button>
    </md-snackbar>

    <!-- SNACKBAR CITA RESERVADA -->
    <md-snackbar :md-position="centered" :md-duration="false ? Infinity : 4000" :md-active.sync="showSnackbarCitaReservada" md-persistent>
      <span>Su cita ha sido aceptada.</span>
      <md-button class="md-primary" @click="showSnackbarCitaReservada = false">Cerrar</md-button>
    </md-snackbar>

    <!-- SNACKBAR CITA CANCELADA -->
    <md-snackbar :md-position="centered" :md-duration="false ? Infinity : 4000" :md-active.sync="showSnackbarCitaCancelada" md-persistent>
      <span>Su cita ha sido cancelada, ha sido redireccionado al inicio.</span>
      <md-button class="md-primary" @click="showSnackbarCitaCancelada = false">Cerrar</md-button>
    </md-snackbar>

  </section>  
</template>

<script>
export default {
  name: 'home',
  components: {},
  data: function(){
    return{
      stateApp: 'offline',
      firedb_user: [],
      user: '',
      pass: '',
      rol: '',
      data: '',
      fecha: '',
      hora: '',
      nota: '',
      todas_citas: '',
      horarios: '',
      inventario: '',
      showDialog: false,
      nombre_producto: '',
      unidades_producto: '',
      precio_producto: '',
      id_producto: '',
      // SNACKBARS
      showSnackbarLogin: false,
      showSnackbarLoginError: false,
      showSnackbarCitaReservada: false,
      showSnackbarCitaCancelada: false
    }
  },
  methods: {
    /**
     * INICIO DE SESION DE USUARIO, ENVIA AL SOCKET DATOS PARA CONOCER AL USUARIO LOGEADO DURANTE LA SESION
     * NORIFICA POR $NOTIFY SI NO LOGEA BIEN
     */
    login_app: function() {
      for(let i = 0; i < this.firedb_user.length; i++){
        if(this.user == this.firedb_user[i].user && this.pass == this.firedb_user[i].pass){
          // SAVE DE DATOS DE USUARIO
          this.rol = this.firedb_user[i].rol;
          this.data = this.firedb_user[i].data;
          // EVENTO CON SERVIDOR Y NOTIFICACION INTERNA
          this.$socket.emit('userLogin', JSON.stringify({user: this.user, rol: this.rol, data: this.data}));
          // NOTIFICACION LOGIN
          this.showSnackbarLogin = true;
          return;
        }
      }
      // NOTIFICACION ERROR
      this.showSnackbarLoginError = true;
    },
    set_hora: function(hora){
      this.hora = hora;
    },
    // REALIZAR RESERVA
    reservar: function(){
      var nueva_cita = {
        dia: this.fecha,
        hora: this.hora,
        nota: this.nota,
        cliente: this.user
      }
      this.$socket.emit('new_reserva', JSON.stringify(nueva_cita));
      this.data.cita.pendiente = 'reserva';
    },
    // CANCELAR UNA CITA
    cancelar_cita: function(cita_pendiente){
      this.$socket.emit('cancelar_reserva', cita_pendiente.id);
    },
    // ACEPTAR UNA CITA
    confirmar_cita: function(cita_pendiente){
      this.$socket.emit('confirmar_reserva', cita_pendiente.id);
    },
    // AÑADIR PRODUCTO AL STOCK DEL INVENTARIO
    add_stock: function(){
      // ID PRODUCTO NUEVO
      this.id_producto = this.inventario.length;
      
      var nuevo_producto = {
        id: this.id_producto,
        producto: this.nombre_producto,
        unidades: this.unidades_producto,
        venta: this.precio_producto
      };
      this.$socket.emit('nuevo_producto', nuevo_producto);
    }
  },
  sockets: {
    connect: function () {
      return true;
    },
    // OBTIENE TODOS LOS USUARIOS REGISTRADOS
    usuarios: function(data) {
      this.firedb_user = data;
    },
    // GUARDA EL TIPO DE ROL DE USUARIO Y APLICA EL ESTADO
    rol_view: function(data){
      this.stateApp = data;
    },
    // OBTIENE TODA LA INFORMACION SOBRE EL LOCAL
    all_local_info: function(data) {
      var aux = JSON.parse(data);

      for(var i = 0; i < aux.length; i++){
        if(this.data.local == aux[i].salon){
          // OBTIENE LAS CITAS
          this.todas_citas = aux[i].citas;
          // OBTIENE LOS HORARIOS 
          this.horarios = aux[i].horarios;
          return;
        }
      }      
    },
    // OBTIENE TODOS LOS DATOS DEL INVENTARIO
    inventario: function (data){
      var aux = JSON.parse(data);
      this.inventario = aux[0].inventario
    },
    // EVENTO RECIBE MODIFICACION DE CITA
    reserva_aceptada: function(){
      if(this.data.cita.pendiente == 'reserva'){
        this.data.cita.pendiente = 'confirmada';
        // NOTIFICACION USUARIO CITA RESERVADA
        this.showSnackbarCitaReservada = true;
      }
    },
    // EVENTO CITA CANCELADA
    reserva_cancelada: function(){
      if(this.data.cita.pendiente == 'reserva'){
        this.data.cita.pendiente = 'sin cita';
        // NOTIFICACION USUARIO CITA CANCELADA
        this.showSnackbarCitaCancelada = true;
      }
    }
  },
  computed: {
    horarios_disponibles: function(){
      var aux_disponibles = [];      
      if(this.horarios && this.todas_citas){
        for(var i = 0; i < this.todas_citas.length; i++){
          aux_disponibles.push(this.todas_citas[i].hora);
        }
        return aux_disponibles;
      }
    },
    horas_reservadas: function(){
      var aux_reservadas = this.horarios;

      if(this.horarios && this.horarios_disponibles){
        for(var i = 0; i < this.horarios.length; i++){
          for(var j = 0; j < this.horarios_disponibles.length; j++){

            if(this.horarios[i] == this.horarios_disponibles[j]){
              aux_reservadas.splice(i,1);
            }

          }
        }
        return aux_reservadas;
      }
    },
    // CITAS ACEPTADAS FIREBASE
    citas_aceptadas: function (){
      var citas_aceptadas = [];
      if(this.todas_citas){
        for(var i = 0; i < this.todas_citas.length; i++){
          if(this.todas_citas[i].estado == 'confirmada'){
            citas_aceptadas.push(this.todas_citas[i]);
          }
        }
        return citas_aceptadas;
      }
    },
    // CITAS PENDIENTES FIREBASE
    citas_pendientes: function (){
      var citas_pendientes = [];
      if(this.todas_citas){
        for(var i = 0; i < this.todas_citas.length; i++){
          if(this.todas_citas[i].estado == 'pendiente'){
            citas_pendientes.push(this.todas_citas[i]);
          }
        }
        return citas_pendientes;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .logo-edate{
    width: 125px;
    margin-bottom: 25px;
  }

  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .form-login{
    padding: 50px 0px;
  }

  #user, #admin{
    padding: 50px 0px;
  }

  #login{
    .boton-login{
      background: #673ab7;
      color: white !important;
    }
  }

  .titulo-local{
    margin-bottom: 25px;
  }

  // COMPONENTE RESERVAR CITAS
  #citas{
    margin: 25px 0px;
    
    .botonera-horas{
      margin: 15px 0px;

      button{
        background-color: #673ab7;
        color: white;
        margin: 5px;
      }
    }

    button{
      background-color: #673ab7;
      color: white;
      margin: 5px;
    }

    .titulo-reserva{
      margin-top: 15px;
    }
  }

  #admin{
    .aceptar-icono{
      color: green !important;
    }

    .cancelar-icono{
      color: red !important;
    }

    .titulo-seccion{
      margin: 15px 0px;
    }
  }
</style>