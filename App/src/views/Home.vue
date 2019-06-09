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
                  <h4 class="titulo-reserva">Dia:</h4>
                  <md-datepicker class="calendario-picker row" v-model="fecha"/>
                  
                  <h4 class="titulo-reserva">Hora:</h4>
                  <div class="col-12 text-center botonera-horas">
                    <md-button class="md-primary">08:00 - 09:00</md-button>
                    <md-button class="md-primary">09:00 - 10:00</md-button>
                    <md-button class="md-primary">10:00 - 11:00</md-button>
                    <md-button class="md-primary">11:00 - 12:00</md-button>
                    <md-button class="md-primary">16:00 - 17:00</md-button>
                    <md-button class="md-primary">17:00 - 18:00</md-button>
                    <md-button class="md-primary">18:00 - 19:00</md-button>
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
      nota: ''
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
    // REALIZAR RESERVA
    reservar: function(hora){
      
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