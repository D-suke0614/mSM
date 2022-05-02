import Vue from 'vue'

// 使うときにコメントインして
// import { use } from 'vue/types/umd'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// import axios from 'axios' //追記
// import VueAxios from 'vue-axios' //追記

// 使うときにコメントインして
// import router from './router'

Vue.config.productionTip = false

// Vue.use(VueAxios, axios)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
