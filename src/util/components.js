
/**
 * 组件工具类,提供一些组件转换工具
 */

const addConponent = function(name, componentPath){
    return {
        name : name,
        component : () => import('../components/page/MenuEditPage')
    }
}
const components = {
    MenuEditPage : addConponent('菜单编辑', '../components/page/MenuEditPage'),
    TablePage : addConponent('通用数据表格', '../components/page/TablePage')
}

const getComponentList = function(){
    let result = [];
    for(let i in components){
        result.push({code: i, name:components[i]['name']});
    }
    console.log(result)
    return result;
}

const getComponent = function(componentCode){
    return components[componentCode]['component'];
}

const getRouter = function(menu){
    return {
        name : menu.path,
        component : getComponent(menu.component_name),
        path : menu.path,
        props : menu.component_param
    };
}

const getRouterList = function(menuList){
    let routers = [];
    for(let menu of menuList){
      if(menu.menu_type == 0){
        routers.push(getRouter(menu));
      }
      if(menu.childList){
        routers = routers.concat(getRouterList(menu.childList))
      }
    }
    return routers;

}

export default {
    getComponent,
    getComponentList,
    getRouter,
    getRouterList
};