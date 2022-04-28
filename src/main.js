import Vue from 'vue'

// 使うときにコメントインして
// import { use } from 'vue/types/umd'
import App from './App.vue'
import vuetify from './plugins/vuetify'

// 使うときにコメントインして
// import router from './router'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
