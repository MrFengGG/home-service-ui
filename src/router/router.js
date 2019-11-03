
import Vue from "vue";
import Router from "vue-router";
import MenuEditPage from "../components/page/MenuEditPage"
Vue.use(Router);

const cacheRoutes = {};
const routes = [
    { path: '/editMenu', component: MenuEditPage },
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
