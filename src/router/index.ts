import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Index from '@/views/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }, {
    path: '/aboutMe',
    name: 'AboutMe',
    component: () => import(/* webpackChunkName: "aboutMe" */ '@/views/aboutMe.vue')
  }, {
    path: '/share',
    name: 'Share',
    component: () => import(/* webpackChunkName: "share" */ '@/views/shareView.vue')
  }, {
    path: '/program',
    name: 'Program',
    component: () => import(/* webpackChunkName: "Program" */ '../views/programView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
