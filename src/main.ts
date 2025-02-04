import { createApp } from 'vue'
import App from './App.vue'
// add pinia
import { createPinia } from 'pinia'
import router from './router'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
