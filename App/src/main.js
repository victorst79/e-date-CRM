import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import firebase from 'firebase/app'
import 'vue-material/dist/vue-material.min.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(VueMaterial);
// Vue.use(firestorePlugin)
Vue.config.productionTip = false

const linkActiveClass = 'my-link-active-class'

// pass custom class to Vue Material
Vue.material.router.linkActiveClass = linkActiveClass

// FIREBASE CONFIG

var firebaseConfig = {
  apiKey: "AIzaSyA2w3M6RazrNteKGb0SoyaLuEG81xu7anA",
  authDomain: "e-date-1d93d.firebaseapp.com",
  databaseURL: "https://e-date-1d93d.firebaseio.com",
  projectId: "e-date-1d93d",
  storageBucket: "e-date-1d93d.appspot.com",
  messagingSenderId: "570681216054",
  appId: "1:570681216054:web:5cf494038585e6a2"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
