import { createApp } from 'vue'
import { extractIdentifiers } from 'vue/compiler-sfc'
// import './style.css'
import App from './App.vue'
import router from './router.js'
import './assets/css/main.css'

createApp(App).use(router).mount('#app')