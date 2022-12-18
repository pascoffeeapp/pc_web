<template>
    <div id="sidebar">
        <router-link v-for="(v, i) in navigations" :key="i" :to="{name: v.route}" class="sidebar-item">
            <div class="icon"><i :class="`fa ${v.icon}`"></i></div>
            <div class="text">{{ v.text }}</div>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios';
import { AuthStore } from '../../stores/Auth';


let navs = [
    {
        route: 'Dashboard',
        text: 'Dashboard',
        icon: 'fa-tachometer-alt',
        permission: 'manager.dashboard',
    },
    {
        route: 'Role',
        text: 'Role',
        icon: 'fa-user-shield',
        permission: 'manager.role',
    },
    {
        route: 'User',
        text: 'User',
        icon: 'fa-users',
        permission: 'manager.user',
    },
    {
        route: 'Table',
        text: 'Table',
        icon: 'fa-chair',
        permission: 'manager.table',
    },
    {
        route: 'Outlet',
        text: 'Outlet',
        icon: 'fa-store',
        permission: 'manager.outlet',
    },
    {
        route: 'Menu',
        text: 'Menu',
        icon: 'fa-coffee',
        permission: 'manager.menu',
    },
    {
        route: 'Takeaway',
        text: 'Takeaway',
        icon: 'fa-shopping-bag',
        permission: 'manager.takeaway',
    },
]

export default {
    data() {
        return {
            navigations: [],
            user: null
        }
    },
    methods: {
        loadNavs() {
            axios.get('/role/'+this.user.id)
            .then(res => {
                if (res.data.status) {
                    let perms = res.data.body.permissions;
                    perms.forEach(perm => {
                        navs.forEach(nav => {
                            if (nav.permission == perm.key) {
                                this.navigations.push(nav);
                            }
                        })
                    })
                }
            })
        }
    },
    mounted() {
        axios.get('/auth/me')
        .then(res => {
            if (res.data.status) {
                this.user = res.data.body;
                this.loadNavs();
            }
        })
    }
}
</script>