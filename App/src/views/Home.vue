<template>
  <section>
    <div id="login" v-if="stateApp == ''">
      <Login stateUser/>
    </div>
    <div id="user" v-if="stateApp == 'user'">
      <User/>
    </div>
    <div id="admin" v-if="stateApp == 'admin'">
      <Admin/>
    </div>
  </section>  
</template>

<script>
import Login from '@/components/Login.vue'
import User from '@/components/User.vue'
import Admin from '@/components/Admin.vue'

export default {
  name: 'home',
  components: {
    User,
    Admin,
    Login
  },
  data: function(){
    return{
      stateApp: ''
    }
  }
}
</script>
