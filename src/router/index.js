import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const loadView = view => {
    return () =>
        import(/* webpackChunkName: "views-[request]" */ `@/views/${view}.vue`)
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: loadView('Home')
    },
    {
        path: '/about',
        name: 'about',
        component: loadView('About')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
