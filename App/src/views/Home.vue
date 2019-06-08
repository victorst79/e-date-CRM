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
            <md-input v-model="user"></md-input>
          </md-field>

          <md-field class="offset-md-2 col-md-8 offset-1 col-10">
            <label>Contraseña</label>
            <md-input type="password" v-model="pass"></md-input>
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
    <div id="user" v-if="stateApp == 'user'">
      <h1>USER</h1>
    </div>
    <div id="admin" v-if="stateApp == 'admin'">
      <h1>ADMIN</h1>
    </div>
  </section>  
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data: function(){
    return{
      stateApp: 'offline',
      firedb_user: [],
      user: '',
      pass: '',
      rol: ''
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
          this.rol = this.firedb_user[i].rol;
          this.$socket.emit('userLogin', JSON.stringify({user: this.user, rol: this.rol}));
        }else{
          this.$notify({
            group: 'error',
            type: 'warn',
            title: 'Error inicio session',
            text: 'Los credenciales indicados no son correctos'
          });
        }
      }
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

  .boton-login{
    background-color: #673ab7 ;
  }
</style>