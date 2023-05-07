import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/layouts/BaseLayout.vue'),
  },
  {
    path: '/map',
    name: 'map',
    redirect: '/map/mapbox',
    component: () => import('@/pages/map/layout/MapLayout.vue'),
    children: [
      {
        path: 'mapbox',
        name: 'mapbox',
        component: () => import('@/pages/map/map-home/MapHome.vue'),
      },
      {
        path: 'cesium',
        name: 'cesium',
        component: () => import('@/pages/map/map-home/MapHome.vue'),
      },
    ],
  },
];

const rootRoutes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default rootRoutes;
