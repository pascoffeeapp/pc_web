import {createWebHistory,createRouter} from "vue-router";
import Dashboard from "./components/contents/Dashboard.vue"
import Menu from "./components/contents/Menu.vue"
import Outlet from "./components/contents/Outlet.vue"
import Role from "./components/contents/Role.vue"
import Stock from "./components/contents/Stock.vue"
import Table from "./components/contents/Table.vue"
import User from "./components/contents/User.vue"
import Wallet from "./components/contents/Wallet.vue"

const routes=[
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/role',
        name: 'Role',
        component: Role
    },
    {
        path: '/user',
        name: 'User',
        component: User
    },
    {
        path: '/table',
        name: 'Table',
        component: Table
    },
    {
        path: '/menu',
        name: 'Menu',
        component: Menu
    },
    {
        path: '/outlet',
        name: 'Outlet',
        component: Outlet
    },
    {
        path: '/stock',
        name: 'Stock',
        component: Stock
    },
    {
        path: '/wallet',
        name: 'Wallet',
        component: Wallet
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;