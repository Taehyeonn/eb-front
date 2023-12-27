import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// vue-router4
import router from "./router";

createApp(App).use(router).mount("#app");
// 기존의 부분 => createApp(App).mount("#app");