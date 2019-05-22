<template>
  <div class="loginandregister">
    <Login></Login>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'loginandregister',
  components: {
      Login
  }
}
</script>
