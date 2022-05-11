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
import ActivityList from './components/Activity/ActivityList.vue'
import ActivitySubstrate from './components/Activity/ActivitySubstrate.vue'
import EmployeeList from './components/Employee/User/EmployeeList.vue'
import AdminList from './components/Employee/Admin/AdminList.vue'
import AdminSubstrate from './components/Employee/Admin/AdminSubstrate.vue'
import ProjectSubstrate from './components/Project/ProjectSubstrate.vue'
import ProjectDetail from './components/Project/ProjectDetail.vue'
import ProjectEditor from './components/Project/ProjectEditor.vue'
import ActivityDetail from './components/Activity/ActivityDetail.vue'
import ActivityEditor from './components/Activity/ActivityEditor.vue'
import EmployeeDetail from './components/Employee/User/EmployeeDetail.vue'
import AdminDetail from './components/Employee/Admin/AdminDetail.vue'
import AdminEditor from './components/Employee/Admin/AdminEditor.vue'
import CsvScreen from './components/CSV/CsvScreen.vue'
import login from './components/login/LoginScreen.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      // ログイン画面
      path: '/',
      name: 'login',
      component: login,
    },
    {
      // カレンダー画面
      path: '/calendar',
      name: 'calender',
      component: Calender
    },
    {
      // カレンダー詳細
      path: '/calendars/detail',
      name: 'calender_detail',
      component: CalenderDetail,
    },
    {
      // カレンダー編集
      path: '/calendars/edit',
      name: 'calender_editor',
      component: CalenderEditor,
    },
    {
      // 顧客
      path: '/clients',
      name: "client",
      component: ClientSubstrate,
    },
    {
      // 顧客検索結果一覧
      path: '/clients/list',
      name: "clientList",
      component: ClientList,
    },
    {
      // 顧客詳細
      path: '/clients/detail',
      name: 'client_detail',
      component: ClientDetail,
    },
    {
      // 顧客編集
      path: '/clients/edit',
      name: 'client_editor',
      component: ClientEditor,
    },
    {
      // 案件
      path: '/projects',
      name: 'project',
      component: ProjectSubstrate,
    },
    {
      // 案件検結果一覧
      path: '/projects/list',
      name: 'projectList',
      component: ProjectList,
    },
    {
      // 案件詳細
      path: '/projects/detail',
      name: 'project_detail',
      component: ProjectDetail,
    },
    {
      // 案件編集
      path: '/projects/edit',
      name: 'project_editor',
      component: ProjectEditor,
    },
    {
      // 活動
      path: '/activity',
      name: 'activity',
      component: ActivitySubstrate,
    },
    {
      // 活動検索結果一覧
      path: '/activities/list',
      name: 'activity/list',
      component: ActivityList,
    },
    {
      // 活動詳細
      path: '/activities/detail',
      name: 'activity_detail',
      component: ActivityDetail,
    },
    {
      // 活動編集
      path: '/activities/edit',
      name: 'activity_editor',
      component: ActivityEditor,
    },
    {
      // 社員
      path: '/employees',
      name: 'adminSubstrate',
      component: AdminSubstrate,
    },
    {
      // 社員検索結果一覧（一般ユーザー用）
      path: '/employees/list',
      name: 'employee',
      component: EmployeeList,
    },
    {
      // 社員詳細（一般ユーザー用）
      path: '/employees/detail',
      name: 'employee_detail',
      component: EmployeeDetail,
    },
    {
      // 社員検索結果一覧（Adminユーザー用）
      path: '/admin/list',
      name: 'admin',
      component: AdminList,
    },
    {
      // 社員編集（Adminユーザー用）
      path: '/admin/detail',
      name: 'admin_detail',
      component: AdminDetail,
    },
    {
      // 社員編集（Adminユーザーのみ）
      path: '/admin/edit',
      name: 'admin_editor',
      component: AdminEditor,
    },
    {
      // CSV
      path: '/csv',
      name: 'csv',
      component: CsvScreen,
    },
  ]
})
