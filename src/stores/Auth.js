import { defineStore } from "pinia";
import axios from 'axios';

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api/";
// axios.defaults.baseURL = "https://kopipas.policyservices.site/api/";
export const AuthStore = defineStore('auth', {
    state: () => ({
        // authenticated: false,
        // token: "",
    }),
    actions: {
        getToken() {
            return window.localStorage.getItem('_token');
        },
        instanceToken() {
            if (this.isAuthenticated()) {
                axios.defaults.headers['Authorization'] = `Bearer ${ this.getToken() }`;
            }
        },
        isAuthenticated() {
            let _token = window.localStorage.getItem('_token');
            return (_token) ? true : false;
        },
        login(params, success, error) {
            axios.post('/auth/login', params)
            .then((res) => {
                let _token = res.data.body.token;
                window.localStorage.setItem('_token', _token);
                this.instanceToken();
                success(_token);
            }).catch((err) => {
                error(err)
            })
        },
        logout(success, error) {
            axios.post('/auth/logout')
            .then((res) => {
                window.localStorage.removeItem('_token');
                success(res);
            }).catch((err) => {
                window.localStorage.removeItem('_token');
                error(err)
            })
        }
    },
})