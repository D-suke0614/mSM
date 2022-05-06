import Vue from 'vue'
import Router from 'vue-router'
// import { createRouter, createWebHashHistory } from 'vue-router'

import Calender from './components/Calender/Calender.vue'
import ClientDetail from './components/Client/ClientDetail.vue'
import ClientIndex from './components/Client/ClientIndex.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'calender',
      component: Calender
    },
    {
      path: '/clients',
      name: "client",
      component: ClientIndex,
    },
    {
      path: '/clients/detail',
      name: 'client_detail',
      component: ClientDetail,
    }
  ]
})
