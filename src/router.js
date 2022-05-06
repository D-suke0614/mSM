import Vue from 'vue'
import Router from 'vue-router'

import Calender from './components/Calender/Calender.vue'
import ClientDetail from './components/Client/ClientDetail.vue'
import ClientList from './components/Client/ClientList.vue'
import ProjectList from './components/Project/ProjectList.vue'
import ActivityList from './components/Activity/ActivityList.vue'
import EmployeeList from './components/Employee/User/EmployeeList.vue'
import AdminList from './components/Employee/Admin/AdminList.vue'
import ProjectSubstrate from './components/Project/ProjectSubstrate.vue'

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
      component: ClientList,
    },
    {
      path: '/clients/detail',
      name: 'client_detail',
      component: ClientDetail,
    },
    {
      path: '/projects/list',
      name: 'projectList',
      component: ProjectList,
    },
    {
      path: '/projects',
      name: 'project',
      component: ProjectSubstrate,
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
