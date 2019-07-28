import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(Vuetify);

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:5000',
  vuex: {
    store,
    mutationPrefix: 'SOCKET_'
  }
}));

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
