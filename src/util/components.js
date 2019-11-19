
/**
 * 组件工具类,提供一些组件转换工具
 */

import MenuEditPage from '../components/page/MenuEditPage'
import TablePage from '../components/page/TablePage'
console.log(MenuEditPage)
const components = {
    MenuEditPage,
    TablePage
}

const getComponentList = function(){
    let result = [];
    for(let i in components){
        result.push({code: i, name:components[i]['pageName']});
    }
    return result;
}

const getComponent = function(componentCode){
    console.log(componentCode);
    console.log(components)
    return components[componentCode];
}


const getComponentSchema = function(component){
    const props = component.props;
    let result = {};
    for(let key in props){
        result[key] = defaultValue(props[key]['type']);
    }
    return result;
}

const defaultValue = function(elementType){
    if(elementType == Object){
        return {};
    }else if(elementType == Number){
        return 0;
    }else if(elementType == String){
        return '';
    }else if(elementType == Array){
        return [];
    }else{
        return null;
    }
}

const getComponentSchemaByCode = function(componentCode){
    return getComponentSchema(getComponent(componentCode));
}

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

export default {
    getComponent,
    getComponentList,
    getRouter,
    getRouterList,
    getComponentSchemaByCode
};