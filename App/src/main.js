import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial);
Vue.config.productionTip = false

const linkActiveClass = 'my-link-active-class'

// pass custom class to Vue Material
Vue.material.router.linkActiveClass = linkActiveClass

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
