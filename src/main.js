import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import axios from 'axios'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import store from './store'
import BootstrapVue from 'bootstrap-vue'


window.axios=axios
import VueSweetalert2 from 'vue-sweetalert2'
import Swal from 'sweetalert2'
Vue.use(VueSweetalert2);



import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.use(BootstrapVue)
Vue.use(VueMaterial)

// axios.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {

//   if (error.response.status === 401 ) {

//     this.$swal({
//       icon : 'error',
//       title : 'Sorry :(',
//       text : 'Token Sudah Kadaluarsa Silahkan Login Kembali'
      
//     })
//   }

//   return Promise.reject(error);
// });

Vue.config.productionTip = false



Vue.use(ArgonDashboard)
new Vue({
  router,
  store,
  render: h => h(App)
 
}).$mount('#app')
