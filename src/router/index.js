import {createRouter, createWebHistory} from 'vue-router';

const pages = import.meta.glob('@/page/*.*');
const routeList = [];
Object.keys(pages).forEach(key => {
    const fileName = key.split('/').pop();
    const routeName = fileName.split('.')[0];
    const route = {
        path: `/${routeName}`,
        name: routeName,
        component: pages[key]
    };

    if (routeName === 'demo') {
        route.children = [
            {
                path: 'a',
                name: 'a',
                component: () => import('@/components/component1.vue'),
            },
            {
                path: 'b',
                name: 'b',
                component: () => import('@/components/component2.vue'),
            }
        ]
    }
    routeList.push(route);
})

routeList.unshift({
    path: '/',
    redirect: routeList[0].path
})

const routes = routeList

const router =  createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    console.log(from, to);
    return true;
})

export default router