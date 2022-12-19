import axios from 'axios';
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

const pinia = createPinia();
const app = createApp(App);

axios.defaults.baseURL = "https://kopipas.policyservices.site/api/";
// axios.defaults.baseURL = "http://localhost:8000/api/";

let _token = window.localStorage.getItem('_token');
if (_token) {
    axios.defaults.headers['Content-Type'] = `multipart/form-data`;
    axios.defaults.headers['Accept'] = `application/json`;
    axios.defaults.headers['Authorization'] = `Bearer ${ _token }`;
}


app.use(pinia).use(router).mount('#app')