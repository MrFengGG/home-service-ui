import Vue from 'vue'
import Vuex from 'vuex'
import request from '../common/request'
import router from '../router/router'

Vue.use(Vuex)
const state = {
    contextConfig : {
        isSlideCollpase : false,
    },
    contextData : {
        token : sessionStorage.getItem('token') || '',
        menuGroup : "plat",
        menuKey : sessionStorage.getItem('menuKey'),
        menuList : [],
        initMenu : false
    }
}

const getters = {
    isSlideCollapse : function(state){
        return state.contextConfig.isSlideCollpase;
    },
    menuGroup : function(state){
        return state.contextData.menuGroup;
    },
    token : function(state){
        return state.contextData.token;
    },
    hasInitMenu : function(state){
        return state.contextData.initMenu;
    },
    currentMenuKey: function(state){
        console.log("menuKey:" + state.contextData.menuKey)
        return state.contextData.menuKey;
    }
}

const mutations = {
    toggleSlideMenu(state){
        state.contextConfig.isSlideCollpase = !state.contextConfig.isSlideCollpase;
    },
    showSlideMenu(state){
        state.contextConfig.isSlideCollapse = true;
    },
    hideSlideMenu(state){
        state.contextConfig.isSlideCollapse = false;
    },
    refreshToken(state, token){
        sessionStorage.setItem("token", token);
        state.contextData.token = token;
    },
    clearToken(state){
        sessionStorage.removeItem("token");
        state.contextData.token = '';
    },
    changeMenuGroup(state, groupName){
        state.contextData.menuGroup = groupName;
    },
    initMenu(state, menuList){
        state.contextData.menuList = menuList;
        state.contextData.initMenu = true;
    },
    changeMenu(state, menuKey){
        console.log("haha" + menuKey)
        state.contextData.menuKey = menuKey;
        sessionStorage.setItem("menuKey", menuKey);
    }
}

const actions = {
    toggleSlideMenu({commit}){
        commit('toggleSlideMenu');
    },
    changeMenuGroup({commit}, groupName){
        commit('changeMenuGroup', groupName);
    },
    changeToken({commit}, token){
        commit('refreshToken', token);
    },
    clearToken({commit}){
        commit('clearToken');
    },
    initMenu({commit}){
        return request.get('/api/menu/getAllMenu',{group: state.contextData.menuGroup}).then(data =>{
            return new Promise(function(resolve, reject){
                if(data.code == 200){
                    router.$accessMenuList(data.data || []);
                    commit('initMenu',data.data);
                    resolve();
                }else{
                    reject(data);
                }
            });
        });
    },
    changeMenu({commit}, menuKey){
        console.log("99:"+menuKey)
        commit('changeMenu', menuKey);
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})