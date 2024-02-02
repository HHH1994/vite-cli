import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/components/component1.vue')
    },
    {
        path: '/b',
        name: 'b',
        component: () => import('@/components/component2.vue')
    }
]

const router =  createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    console.log(from, to);
    return true;
})

export default router