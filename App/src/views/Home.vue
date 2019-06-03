<template>
  <section>
    <div id="user" v-if="stateUser == 'offline'">
      <Login/>
    </div>
    <div id="user" v-if="stateUser == 'user'">
      <User/>
    </div>
    <div id="admin" v-if="stateUser == 'admin'">
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
      stateUser: 'offline'
    }
  }
}
</script>
