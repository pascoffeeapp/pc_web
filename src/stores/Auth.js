import { defineStore } from "pinia";
import axios from 'axios';

export const AuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        getToken() {
            return window.localStorage.getItem('_token');
        },
        loadUser() {
            if (this.isAuthenticated()) {
                axios.get('/auth/me')
                .then(res => {
                    if (res.data.status) {
                        this.$state.user = res.data.body;
                    }
                })
            }
        },
        getUser() {
            return this.user;
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
                axios.defaults.headers['Content-Type'] = `multipart/form-data`;
                axios.defaults.headers['Accept'] = `application/json`;
                axios.defaults.headers['Authorization'] = `Bearer ${ _token }`;
                this.loadUser();
                success(_token);
            }).catch((err) => {
                error(err)
            })
        },
        logout(success, error) {
            axios.post('/auth/logout')
            .then((res) => {
                window.localStorage.removeItem('_token');
                if (success) success(res);
            }).catch((err) => {
                window.localStorage.removeItem('_token');
                if (error) error(err)
            })
        }
    },
})