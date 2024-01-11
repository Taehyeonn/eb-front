import { createWebHistory, createRouter } from "vue-router";

import View from "./views/View.vue";
import Write from "./views/Write.vue";
import List from "./views/List.vue";
import Delete from "./views/Delete.vue";

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
  {
    path: "/list/view/:id/delete",
    component: Delete,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  watchQuery: true,
});

export default router;