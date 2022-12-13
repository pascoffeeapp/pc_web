import {createWebHistory,createRouter} from "vue-router";
import Manager from "./views/manager/Manager.vue"
import Dashboard from "./views/manager/contents/Dashboard.vue"
import Menu from "./views/manager/contents/Menu.vue"
import Outlet from "./views/manager/contents/Outlet.vue"
import Role from "./views/manager/contents/Role.vue"
import Stock from "./views/manager/contents/Stock.vue"
import Table from "./views/manager/contents/Table.vue"
import User from "./views/manager/contents/User.vue"
import Wallet from "./views/manager/contents/Wallet.vue"
import NotFound from "./views/manager/contents/NotFound.vue"
import TakeAway from "./views/manager/contents/TakeAway.vue"

import Login from "./views/auth/Login.vue"
import Home from "./views/main/Home.vue"

const routes=[
    {
        path: '/',
        name: 'Home',
        components: {
            default:  Home,
        },
    },
    {
        path: '/auth/login',
        name: 'Login',
        components: {
            default:  Login,
        },
    },
    {
        path: '/manager',
        components: {
            default:  Manager,
            contents: NotFound
        },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                components: {
                    contents:  Dashboard,
                }
            },
            {
                path: 'role',
                name: 'Role',
                components: {
                    contents:  Role,
                }
            },
            {
                path: 'user',
                name: 'User',
                components: {
                    contents:  User,
                }
            },
            {
                path: 'table',
                name: 'Table',
                components: {
                    contents:  Table,
                }
            },
            {
                path: 'menu',
                name: 'Menu',
                components: {
                    contents:  Menu,
                }
            },
            {
                path: 'outlet',
                name: 'Outlet',
                components: {
                    contents:  Outlet,
                }
            },
            {
                path: 'stock',
                name: 'Stock',
                components: {
                    contents:  Stock,
                }
            },
            {
                path: 'wallet',
                name: 'Wallet',
                components: {
                    contents:  Wallet,
                }
            },
            {
                path: 'take_away',
                name: 'Takeaway',
                components: {
                    contents:  TakeAway,
                }
            },
        ],
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;