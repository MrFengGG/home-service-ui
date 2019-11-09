
/**
 * 组件工具类,提供一些组件转换工具
 */

import MenuEditPage from '../components/page/MenuEditPage'
import TablePage from '../components/page/TablePage'

const components = {
    MenuEditPage,
    TablePage
}

const getComponentList = function(){
    let result = [];
    for(let i in components){
        result.push({code: i, name:components[i]['pageName']});
    }
    console.log(result)
    return result;
}

const getComponent = function(componentCode){
    return components[componentCode];
}

const getRouter = function(menu){
    return {
        name : menu.path,
        component : getComponent(menu.componentName),
        path : menu.path,
        props : menu.componentParam
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

export default {
    getComponent,
    getComponentList,
    getRouter,
    getRouterList
};