import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomePage from "@/pages/homePage/index.vue";
import IndexPage from "@/pages/indexPage/index.vue";
import AboutPage from "@/pages/aboutPage/index.vue";
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
    component: HomePage,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "home/index",
        component: IndexPage,
      },
      {
        path: "/about",
        name: "about",
        component: AboutPage,
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
        path: "/add",
        name: "add",
        component: AddPage,
      },
    ],
  },
];

const rootRoutes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default rootRoutes;
