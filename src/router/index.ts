import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomePage from "@/pages/homePage/index.vue";
import BookPage from "@/pages/bookPage/index.vue";
import MePage from "@/pages/mePage/index.vue";
import AddPage from "@/pages/addPage/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/homePage/index.vue"),
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "home/index",
        component: () => import("@/pages/indexPage/index.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/pages/aboutPage/index.vue"),
      },
      {
        path: "/book",
        name: "book",
        component: BookPage,
      },
      {
        path: "/me",
        name: "me",
        component: MePage,
      },
      {
        path: "/tools",
        name: "tools",
        component: () => import("@/pages/addPage/AddPage.vue"),
      },
    ],
  },
];

const rootRoutes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default rootRoutes;
