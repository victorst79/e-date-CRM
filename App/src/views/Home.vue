<template>
  <section>
    <div id="home" v-if="stateUser == 'offline'">
      <NoUser/>
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
import NoUser from '@/components/NoUser.vue'
import User from '@/components/User.vue'
import Admin from '@/components/Admin.vue'

export default {
  name: 'home',
  components: {
    NoUser,
    User,
    Admin
  },
  data: function(){
    return{
      stateUser: 'offline'
    }
  }
}
</script>
