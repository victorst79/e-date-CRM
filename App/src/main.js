import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import VueSocketIO from 'vue-socket.io'
import Notifications from 'vue-notification'
import 'vue-material/dist/vue-material.min.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

// MATERIAL THEME
import 'vue-material/dist/vue-material.min.css'
// PWA SERVICE WORKER
import './registerServiceWorker'

Vue.use(VueMaterial);
Vue.use(Notifications);

Vue.config.productionTip = false

const linkActiveClass = 'my-link-active-class'

// Vue Material
Vue.material.router.linkActiveClass = linkActiveClass

// SOCKET CONNECTION
Vue.use(new VueSocketIO({
  debug: false,
  // DESCOMENTAR PARA TRABAJO LOCAL
  // connection: 'http://localhost:3000/',
  connection: window.location.hostname
}));

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
