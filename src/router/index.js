import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '@/vue-router/index.js'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'home1',
        name: 'home1',
        component: ()=>import ('@/views/home-son')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// hash history 两种模式
// 修改页面路径不刷新页面
// hash丑 不影响刷新 兼容性好
// window.location.hash = '/path'
// history好看些 影响刷新需要服务端支持
// window.history.pushState({},null,'/path')

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
