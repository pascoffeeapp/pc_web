<script setup>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import Content from './Content.vue'
</script>

<template>
    <Header @toggle-clicked="toggleSidebar" :user="user" v-if="user != null" />
    <div id="wrapper" class="hide">
        <Sidebar :user="user" :env="env" v-if="user != null"/>
        <Content :user="user" :env="env"  v-if="user != null"/>
    </div>
</template>

<script>
import { AuthStore } from '../../stores/Auth';
import axios from 'axios';
export default {
    props: {
        env: Object,
    },
    data() {
        return {
            showSidebar: false,
            user: null,
        }
    },
    mounted() {
        if (AuthStore().isAuthenticated()) {
            axios.get('/auth/me')
            .catch(err => {
                if (err.response) {
                    if (err.response.data) {
                        AuthStore().logout();
                        this.$router.replace({name: 'Login'})
                    }
                }
            })
        }else {
            this.$router.replace({name: 'Login'})
        }
    },
    methods: {
        toggleSidebar() {
            if (this.showSidebar) {
                document.querySelector('#wrapper').classList.add('hide')
                this.showSidebar = false;
            }else {
                document.querySelector('#wrapper').classList.remove('hide')
                this.showSidebar = true;
            }
        }
    },
    mounted() {
        axios.get('/auth/me')
        .then(res => {
            if (res.data.status) {
                this.user = res.data.body;
            }
        })
        .catch(err => {
            AuthStore().logout();
            this.$router.replace({name: 'Login'})
        })
    }
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css');
@import '../../assets/css/style.css';
</style>