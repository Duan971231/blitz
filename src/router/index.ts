
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomePage from '@/pages/homePage/index.vue'
import IndexPage from '@/pages/indexPage/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  }, 
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'home/index',
        component: IndexPage,
      }
    ]
  },
]

const rootRoutes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default rootRoutes;