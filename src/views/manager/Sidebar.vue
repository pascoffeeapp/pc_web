<template>
    <div id="sidebar">
        <router-link v-for="(v, i) in navigations" :key="i" :to="{name: v.route}" class="sidebar-item" ref="sidebar_item">
            <div class="icon"><i :class="`fa ${v.icon}`"></i></div>
            <div class="text">{{ v.text }}</div>
        </router-link>
    </div>
</template>

<script>

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
    {
        route: 'Cashier',
        text: 'Cashier',
        icon: 'fa-cash-register',
        permission: 'manager.cashier',
    },
]

export default {
    props: {
        user: Object,
    },
    data() {
        return {
            navigations: [],
        }
    },
    methods: {
        setActive(e) {
            // this.$refs.sidebar_item.forEach(el => {
            //     el.classList.remove('active');
            // });

            // console.log(e.target.parentNode);
        },
        loadNavs() {
            let perms = this.user.role.permissions;
            this.navigations = [];
            perms.forEach(perm => {
                navs.forEach(nav => {
                    if (nav.permission == perm.key) {
                        this.navigations.push(nav);
                    }
                })
            })
        }
    },
    mounted() {
        this.loadNavs();
    }
}
</script>