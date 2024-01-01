import { createWebHistory, createRouter } from "vue-router";

import ListView from './views/ListView.vue';
import View from "./views/View.vue";
import Write from "./views/Write.vue";

const routes = [
  {
    path: "/",
    redirect: "/list",
  },
  {
    path: "/list",
    component: ListView,
    //페이지처리. 만약 페이지에 해당하는 숫자 입력이 없으면 첫 페이지로
    props: route => ({ pageNum: parseInt(route.query.pageNum) || 1 })
  },
  {
    path: "/list/view/:id",
    component: View,
  },
  {
    path: "/board/write",
    component: Write,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  watchQuery: true,
});

export default router;