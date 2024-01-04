import { createWebHistory, createRouter } from "vue-router";

// import ListView from './views/ListView.vue';
import View from "./views/View.vue";
import Write from "./views/Write.vue";
import List from "./views/List.vue";

const routes = [
  {
    path: "/",
    redirect: "/list",
  },
  {
    path: "/list",
    component: List,
  },
  {
    path: "/list/view/:id",
    component: View,
  },
  {
    path: "/list/write",
    component: Write,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  watchQuery: true,
});

export default router;