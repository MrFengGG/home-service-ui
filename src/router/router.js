
import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store'

Vue.use(Router);

/**
 * 获取动态页面组件
 * @param {页面组件相对路径} pagePath 
 */
const getPageComponent = function(pagePath){
    return () => import(`../components/page${pagePath}`);
}

const LoginPage = getPageComponent('/plat/LoginPage');
const Home = getPageComponent('/plat/Home');
const Index = getPageComponent('/plat/Index');
const MenuEditPage = getPageComponent('/plat/menu/MenuEditPage');
const FormEditPage = getPageComponent('/plat/FormEditPage');
const MenuListPage = getPageComponent('/plat/menu/MenuListPage');

const RoleListPage = getPageComponent('/plat/role/RoleListPage');
const UserListPage = getPageComponent('/plat/user/UserListPage');
const UserEditPage = getPageComponent('/plat/user/UserEditPage');

//菜单页面
const menuRouter = [
    {
        path: '/plat/index',
        component: Index,
        meta: {
            needLogin: true,
            routerName: '平台管理-首页'
        },
    },{
        path: '/plat/menu/edit',
        component: MenuEditPage,
        meta: {
            needLogin: true,
            routerName: '平台管理-菜单编辑'
        },
    },{
        path: '/plat/tool/editForm',
        component: FormEditPage,
        meta: {
            needLogin: true,
            routerName: '平台管理-表单编辑器'
        }
    },{
        path: '/plat/menu/list',
        component: MenuListPage,
        meta: {
            needLogin: true,
            routerName: '平台管理-菜单列表'
        }
    },{
        path: '/plat/role/list',
        component: RoleListPage,
        meta: {
            needLogin: true,
            routerName: '平台管理-角色列表'
        }
    },{
        path: '/plat/user/list',
        component: UserListPage,
        meta: {
            needLogin: true,
            routerName: '平台管理-用户列表'
        }
    },{
        path: 'plat/user/edit',
        component: UserEditPage,
        meta: {
            needLogin: true,
            routerName: '平台管理-用户编辑'
        }
    }
]

//路由
const routes = [
    {
        path: '', 
        component: Home, 
        redirect: 'plat/index',
        meta: {
            needLogin: true,
        },
        children: menuRouter
    },{ 
        path: '/login', 
        component: LoginPage,
        meta: {
            needLogin: false,
            routerName: '登录页面'
        }
    }
];

const router = new Router({
    routes,
});

router.beforeEach((to, from, next) => {
    if(to.meta.needLogin && !store.getters.token){
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }else{
        next();
    }
});

router.getPathSelector = function(){
    return menuRouter.map(menu => {
        return {name: menu.meta.routerName, code: menu.path};
    });
}

export default router;
