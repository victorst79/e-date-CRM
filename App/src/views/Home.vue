<template>
  <section>
    <!-- LOGIN COMPONENT -->
    <div id="login" v-if="stateApp == 'offline'">
      <div class="form-login container">
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
      <h2 class="text-center">{{data.local}}</h2>
      <md-card class="container">
        <md-card-header class="offset-2 col-8">
          <div id="citas">
            <!-- RESERVAR -->
            <div class="container" v-if="data.cita.pendiente == false">
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
                    <label>Nota para el establecimiento</label>
                    <md-textarea v-model="nota" md-autogrow></md-textarea>
                  </md-field>

                  <div class="offset-11">
                    <md-button class="md-primary">Reservar</md-button>  
                  </div>                  
                </div>
              </section>
            </div>  
            <!-- RESERVADA -->
            <div v-if="data.cita.pendiente == true">
              
            </div>
          </div>
        </md-card-header>
      </md-card>
    </div>
    <!-- FIN CLIENTE COMPONENTE -->
    
    <!-- ADMIN COMPONENTE -->
    <div id="admin" v-if="stateApp == 'admin'">
      <md-card class="container">
        <md-card-header class="offset-2 col-8">
          <div class="md-title">{{data.local}}</div>
        </md-card-header>
      </md-card>
    </div>
    <!-- FIN ADMIN COMPONENTE -->
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
      horarios: ''
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
          this.$notify({
            group: 'login',
            title: 'Sesion  Iniciada',
            text: 'Has iniciado sesion correctamente.'
          });
          return;
        }
      }
      // NOTIFICACION ERROR
      this.$notify({
        group: 'error',
        type: 'warn',
        title: 'Error inicio session',
        text: 'Los credenciales indicados no son correctos'
      });
    },
    set_hora: function(hora){
      this.hora = hora;
    },
    // REALIZAR RESERVA
    reservar: function(){
      var nueva_cita = {
        dia: this.feacha,
        hora: this.hora,
        nota: this.nota,
        cliente: this.user
      }
      this.$socket.emit('new_reserva', JSON.stringify(nueva_cita));
      this.$notify({
            group: 'success',
            title: 'Reserva Realizada',
            text: 'Seras notificado cuando tu reserva sea aceptada'
          });
      data.cita.pendiente = true;
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
    }    
  }
}
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .form-login{
    padding: 50px 0px;
  }

  #user{
    padding: 50px 0px;
  }

  #login{
    .boton-login{
      background: #673ab7;
      color: white !important;
    }
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
</style>