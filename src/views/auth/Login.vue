<script setup>
import { AuthStore } from '../../stores/Auth';

const store = AuthStore();
</script>

<template>
    <div class="login-wrapper">
        <div class="container">
            
            <div class="left">
                <img src="../../assets/img/Logo.svg" alt="Logo">
            </div>
    
            <div class="login">
                <div class="form">
                    <h1>Sign In</h1>
                    <div class="alert alert-danger small p-2 text-center" v-if="loginFailed">Username or password went wrong</div>
                    <label for="username">Username</label>
                    <input id="username" type="text" @keydown.enter="login" placeholder="Enter Usename"  v-model="username">
                    <div class="small text-danger" v-for="(v, i) in errors.username" :key="i">{{v}}</div>

                    <label for="password" class="mt-3">Password</label>
                    <input id="password" type="password" @keydown.enter="login" placeholder="Enter Password" v-model="password">
                    <div class="small text-danger" v-for="(v, i) in errors.password" :key="i">{{v}}</div>
                    <button class="mt-3" @click="login">Sign In</button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
// import { AuthStore } from '../../stores/Auth';

export default {
    data(){
        return{
            store: null,
            username: '',
            password: '',
            loginFailed: false,
            errors: {
                username: [],
                password: [],
            }
        }
    },
    mounted() {
        if (AuthStore().isAuthenticated()) {
            this.$router.replace({name: 'Dashboard'})
        }
    },
    methods:{
        login(){
            const store = AuthStore();
            store.login({
                username: this.username,
                password: this.password,
            }, (data) => {
                this.$router.push({name: 'Dashboard'})
            }, (err) => {
                let res = err.response;
                if (res) {
                    if (res.status == 403) {
                        for (const key in res.data[`body`]) {
                            if (Object.hasOwnProperty.call(res.data[`body`], key)) {
                                this.errors[key] = res.data[`body`][key];
                            }
                        }
                    }else {
                        this.loginFailed = true;
                    }
                }
            })
        },
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
@import '../../assets/css/login.css';
</style>