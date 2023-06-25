import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayView from "../views/PlayView.vue";

const routes = [
  {
    path: "/",
    redirect: () => {
      return {
        name: "home",
      };
    },
  },
  {
    path: "/game",
    name: "game",
    component: PlayView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
