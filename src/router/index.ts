import {createRouter, createWebHistory} from 'vue-router';

const pages = import.meta.glob('@/page/*.*');
const routeList: Array<RouteRecordRaw> = [];
Object.keys(pages).forEach(key => {
    const fileName:string = key.split('/').pop()!;
    const routeName = fileName.split('.')[0];
    const route:RouteRecordRaw = {
        path: `/${routeName}`,
        name: routeName,
        component: () => import('@/components/layout/index.vue'),
        children: [
            {
                path: '',
                component: pages[key]
            }
        ]
    };

    if (routeName === 'demo') {
        route.children[0].children = [
            {
                path: 'a',
                name: 'a',
                component: () => import('@/components/componentOne.vue'),
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