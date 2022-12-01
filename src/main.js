import { createApp } from 'vue'
import { extractIdentifiers } from 'vue/compiler-sfc'
// import './style.css'
import App from './App.vue'
import router from './router.js'
// import './assets/css/main.css'
import './assets/bs_js/bootstrap.bundle.min.js'

createApp(App).use(router).mount('#app')