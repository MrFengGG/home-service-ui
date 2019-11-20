
import Vue from "vue";
import Router from "vue-router";
import MenuEditPage from "../components/page/MenuEditPage"
import LoginPage from '../components/page/LoginPage'
import Home from '../components/page/Home'
Vue.use(Router);
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
const getRouter = function(menu){
    return {
        component : getComponent(menu.componentName),
        path : menu.menuPath,
        props : {}
    };
}
const getRouterList = function(menuList){
    let routers = [];
    for(let menu of menuList){
      if(menu.menuType == 0){
        routers.push(getRouter(menu));
      }
      if(menu.childList){
        routers = routers.concat(getRouterList(menu.childList))
      }
    }
    return routers;
}
//增加router
router.$addRoutes = function(routers){
    routes[1]['children'] = [...routers, ...routes[1]['children']]
    router.addRoutes(routes);
};
//根据菜单增加router
router.$accessMenuList = function(menuList){
    const routers = getRouterList(menuList);
    this.$addRoutes(routers);
}

export default router;
