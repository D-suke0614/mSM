import Vue from 'vue'
import Router from 'vue-router'

import Calender from './components/Calender/Calender.vue'
import ClientDetail from './components/Client/ClientDetail.vue'
import ClientIndex from './components/Client/ClientList.vue'
import ProjectList from './components/Project/ProjectList.vue'
import ActivityList from './components/Activity/ActivityList.vue'
import EmployeeList from './components/Employee/User/EmployeeList.vue'
import AdminList from './components/Employee/Admin/AdminList.vue'

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
    },
    {
      path: '/projects',
      name: 'project',
      component: ProjectList,
    },
    {
      path: '/activities',
      name: 'activity',
      component: ActivityList,
    },
    {
      path: '/employees',
      name: 'employee',
      component: EmployeeList,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminList,
    },

  ]
})
