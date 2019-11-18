
import Vue from "vue";
import Router from "vue-router";
import MenuEditPage from "../components/page/MenuEditPage"
import LoginPage from '../components/page/LoginPage'
Vue.use(Router);

const cacheRoutes = {};
const routes = [
    { path: '/editMenu', component: MenuEditPage },
    { path: '/login', component: LoginPage }
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
    router.addRoutes(noCacheRouters)
    console.log()
};
export default router;
