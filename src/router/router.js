
import Vue from "vue";
import Router from "vue-router";
import MenuEditPage from "../components/page/MenuEditPage"
import LoginPage from '../components/page/LoginPage'
import Home from '../components/page/Home'
Vue.use(Router);

const cacheRoutes = {};
const routes = [
    { 
        path: '/', redirect: '/home'
    },{
        path: '/home', 
        component: Home, 
        meta: {
            needLogin: true
        },
        children: [
            { 
                path: '/editMenu', 
                component: MenuEditPage ,
                meta: {
                    needLogin: true
                }
            }
        ]
    },{ 
        path: '/login', 
        component: LoginPage,
        meta: {
            needLogin: false
        }
    }
];
const router = new Router({
    routes,
});
router.$addRoutes = (routers) => {
    const noCacheRouters = routers.filter(router => {
        return !(router.name in cacheRoutes);
    });
    for(let noCacheRouter of noCacheRouters){
        cacheRoutes[noCacheRouter.name] = noCacheRouters;
    }
    routes[1]['children'] = [...noCacheRouters, ...routes[1]['children']]
    console.log(routes);
    router.addRoutes(routes);
};

export default router;
