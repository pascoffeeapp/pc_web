<template>

    <div id="header">
        <div id="toggle" @click="toggleSidebar">
            <i class="fa fa-bars"></i>
        </div>
        <div class="logo-kopi">
            <b>KOPI</b> 
        </div>
        <div class="logo-pas">
            <b> PAS</b>
        </div>
        <div class="right-side">
            <div class="text-capitalize">{{ user.username }}</div>
            <div class="devider"></div>
            <div class="text-capitalize">{{ user.role.name }}</div>
            <div class="devider"></div>
            <button class="btn btn-cream" @click="logout">LOGOUT</button>
        </div>
    </div>
  
</template>

<script>
import axios from 'axios';
import { AuthStore } from '../../stores/Auth';
export default {
    props: {
        user: Object,
    },
    methods: {
        toggleSidebar() {
            this.$emit('toggleClicked', true)
        },
        logout() {
            const store = AuthStore();
            store.logout(() => {
                this.$router.replace({name: 'Login'})
            }, (err) => {
                this.$router.replace({name: 'Login'})
            })

        }
    },
    mounted() {
        
    }
}
</script>