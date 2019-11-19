import Vue from 'vue'
import Vuex from 'vuex'
import request from '../util/request'
import router from '../router/router'
import componentUtils from '../util/components'

Vue.use(Vuex)
const state = {
    contextConfig : {
        isSlideCollpase : false,
    },
    contextData : {
        token : sessionStorage.getItem('token'),
        menuGroup : "plat",
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
    },
    changeMenuGroup(state, groupName){
        state.contextData.menuGroup = groupName;
    },
    initMenu(state, menuList){
        state.contextData.menuList = menuList;
        state.contextData.initMenu = true;
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
    initMenu({commit}){
        return request.get('/api/menu/getAllMenu',{group: state.contextData.menuGroup}).then(data =>{
            if(data.code > 0){
                router.$addRoutes(componentUtils.getRouterList(data.data));
                commit('initMenu',data.data);
            }
        });
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})