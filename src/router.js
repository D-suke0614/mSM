import Vue from 'vue'
import Router from 'vue-router'

import Calender from './components/Calender/Calender.vue'
import CalenderDetail from './components/Calender/CalenderDetail.vue'
import CalenderEditor from './components/Calender/CalenderEditor.vue'
import ClientDetail from './components/Client/ClientDetail.vue'
import ClientList from './components/Client/ClientList.vue'
import ClientEditor from './components/Client/ClientEditor.vue'
import ClientSubstrate from './components/Client/ClientSubstrate.vue'
import ProjectList from './components/Project/ProjectList.vue'
import ProjectSubstrate from './components/Project/ProjectSubstrate.vue'
import ProjectDetail from './components/Project/ProjectDetail.vue'
import ProjectEditor from './components/Project/ProjectEditor.vue'
import ActivityList from './components/Activity/ActivityList.vue'
import ActivityDetail from './components/Activity/ActivityDetail.vue'
import ActivityEditor from './components/Activity/ActivityEditor.vue'
import EmployeeList from './components/Employee/User/EmployeeList.vue'
import EmployeeDetail from './components/Employee/User/EmployeeDetail.vue'
import AdminList from './components/Employee/Admin/AdminList.vue'
import AdminDetail from './components/Employee/Admin/AdminDetail.vue'
import AdminEditor from './components/Employee/Admin/AdminEditor.vue'
import Login from './components/Login/Login.vue'

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
      path: '/calenders/detail',
      name: 'calender_detail',
      component: CalenderDetail,
    },
    {
      path: '/calenders/edit',
      name: 'calender_editor',
      component: CalenderEditor,
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
      path: '/clients/edit',
      name: 'client_editor',
      component: ClientEditor,
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
      path: '/projects/detail',
      name: 'project_detail',
      component: ProjectDetail,
    },
    {
      path: '/projects/edit',
      name: 'project_editor',
      component: ProjectEditor,
    },
    {
      path: '/activities/list',
      name: 'activity',
      component: ActivityList,
    },
    {
      path: '/activities/detail',
      name: 'activity_detail',
      component: ActivityDetail,
    },
    {
      path: '/activities/edit',
      name: 'activity_editor',
      component: ActivityEditor,
    },
    {
      path: '/employees/list',
      name: 'employee',
      component: EmployeeList,
    },
    {
      path: '/employees/detail',
      name: 'employee_detail',
      component: EmployeeDetail,
    },
    {
      path: '/admin/list',
      name: 'admin',
      component: AdminList,
    },
    {
      path: '/admin/detail',
      name: 'admin_detail',
      component: AdminDetail,
    },
    {
      path: '/admin/edit',
      name: 'admin_editor',
      component: AdminEditor,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ]
})
