import Vue from 'vue'
import Router from 'vue-router'

import Calender from './components/Calender/Calender.vue'
import ClientDetail from './components/Client/ClientDetail.vue'
import ClientList from './components/Client/ClientList.vue'
import ClientSubstrate from './components/Client/ClientSubstrate.vue'
import ProjectList from './components/Project/ProjectList.vue'
import ActivityList from './components/Activity/ActivityList.vue'
import ActivitySubstrate from './components/Activity/ActivitySubstrate.vue'
import EmployeeList from './components/Employee/User/EmployeeList.vue'
import AdminList from './components/Employee/Admin/AdminList.vue'
import AdminSubstrate from './components/Employee/Admin/AdminSubstrate.vue'
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
      path: '/clients/list',
      name: "clientList",
      component: ClientList,
    },
    {
      path: '/clients',
      name: "client",
      component: ClientSubstrate,
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
      path: '/activity',
      name: 'activity',
      component: ActivitySubstrate,
    },
    {
      path: '/activities/list',
      name: 'activity/list',
      component: ActivityList,
    },
    {
      path: '/employees',
      name: 'employee',
      component: EmployeeList,
    },
    {
      path: '/admin',
      name: 'adminSubstrate',
      component: AdminSubstrate,
    },
    {
      path: '/admins/list',
      name: 'admin',
      component: AdminList,
    },

  ]
})
