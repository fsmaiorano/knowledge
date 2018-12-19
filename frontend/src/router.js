import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

import Home from '@/views/home/Home'
import AdminPages from '@/views/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticlesById from '@/components/article/ArticlesById'
import Auth from '@/views/auth/Auth.vue'

import { userKey } from '@/global'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/auth',
            name: 'auth',
            component: Auth,
        },
        {
            path: '/admin',
            name: 'adminPages',
            meta: {
                isAdmin: true,
            },
            component: () =>
                import(/* webpackChunkName: "adminPages" */ './views/admin/AdminPages.vue'),
        },
        {
            path: '/categories/:id/articles',
            name: 'articlesByCategory',
            component: () => import('./components/article/ArticlesByCategory'),
        },
        {
            path: '/article/:id',
            name: 'ArticlesById',
            component: () => import('./components/article/ArticlesById'),
        },
    ],
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.isAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router
