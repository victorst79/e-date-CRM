<template>
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
</template>

<script>
export default {
  name: 'Login',
  props: ['stateUser'],
  data: function() {
    return{
      firedb_user: [],
      user: '',
      pass: '',
      rol: '',
      state: this.stateUser
    }
  },
  methods: {
    /**
     * INICIO DE SESION DE USUARIO, ENVIA AL SOCKET DATOS PARA CONOCER AL USUARIO LOGEADO DURANTE LA SESION
     * NO GUARDA EL ROL AUN
     */
    login_app: function() {
      for(let i = 0; i < this.firedb_user.length; i++){
        if(this.user == this.firedb_user[i].user && this.pass == this.firedb_user[i].pass ){
          this.rol = this.firedb_user[i].rol;
          this.$socket.emit('userLogin', JSON.stringify({user: this.user, rol: this.rol}));
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
    // GUARDA EL TIPO DE ROL DE USUARIO
    rol_view: function(data){
      this.stateUser = data;
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
