import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        login: Login
      },
      children: [
        { path: '/list', name: 'list', component: () => import('./views/List.vue') },
        { path: '/jiaoxue', name: 'jiaoxue', component: () => import('./views/Jiaoxue.vue') },
        { path: '/testmanage', name: 'jiaoxue', component: () => import('./views/TestManage.vue') },
        { path: '/platdesc', name: 'jiaoxue', component: () => import('./views/PlatDesc.vue') },
        { path: '/downloads', name: 'jiaoxue', component: () => import('./views/Downloads.vue') },
        { path: '/notices', name: 'notices', component: () => import('./views/Notices.vue') },
        { path: '/adminManage', name: 'adminManage', component: () => import('./views/AdminManage.vue') }
      ]
    }
  ]
})
