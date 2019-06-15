<template>
  <section id="registro">
        <div class="form-login container">
            <md-card class="row">

                <md-card-header class="offset-2 col-8">
                <div class="md-title">Registro</div>
                </md-card-header>
                
                <md-field md-clearable class="offset-md-2 col-md-8 offset-1 col-10">
                <label>Usuario</label>
                <md-input v-model="user" @keypress.enter="login_app"></md-input>
                </md-field>

                <md-field class="offset-md-2 col-md-8 offset-1 col-10">
                <label>Contraseña</label>
                <md-input type="password" v-model="pass" @keypress.enter="login_app"></md-input>
                </md-field>

                <md-field class="offset-md-2 col-md-8 offset-1 col-10">
                <label>E-Mail</label>
                <md-input type="email" v-model="pass" @keypress.enter="login_app"></md-input>
                </md-field>

                <md-field md-clearable class="offset-md-2 col-md-8 offset-1 col-10">
                <label>Codigo Local</label>
                <md-input v-model="user" @keypress.enter="login_app"></md-input>
                </md-field>

                <div class="col-12">
                <md-card-actions>
                    <md-button class="boton-login" v-on:click="login_app">Login</md-button>
                </md-card-actions>
                </div>
                
            </md-card>
        </div>
  </section>
</template>

<script>
export default {
  name: 'NewAccount'
}
</script>


<style lang="scss" scope>

.form-login{
    padding: 50px 0px;
  }

#registro{
    .boton-login{
      background: #673ab7;
      color: white !important;
    }
  }

</style>
