<template>
  <div class="form-login container">
     <md-card class="row">
      <md-card-header class="offset-2 col-8">
        <div class="md-title">Iniciar Sesion</div>
      </md-card-header>
      <md-field md-clearable class="offset-md-2 col-md-8 offset-1 col-10">
        <label>Usuario</label>
        <md-input></md-input>
      </md-field>

      <md-field class="offset-md-2 col-md-8 offset-1 col-10">
        <label>Contraseña</label>
        <md-input type="password"></md-input>
      </md-field>
      <md-card-actions class="">
        <md-button class="boton-login">Create user</md-button>
      </md-card-actions>
     </md-card>
  </div>
</template>

<script>
export default {
  name: 'Login'
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
