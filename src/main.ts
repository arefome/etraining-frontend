import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import 'vue3-toastify/dist/index.css'

const pinia = createPinia();

const app = createApp(App);

app.use(Vue3Toastify, {
    autoClose: 3000,
} as ToastContainerOptions);

app.use(pinia);
app.use(router);
app.mount("#app");
