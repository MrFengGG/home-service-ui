import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    contextConfig : {
        isSlideCollpase : false,
    },
    contextData : {
        token : sessionStorage.getItem('token') || '',
        menuKey : sessionStorage.getItem('menuKey'),
        menuGroup : "plat",
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
    currentMenuKey: function(state){
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
    changeMenu(state, menuKey){
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
    changeMenu({commit}, menuKey){
        commit('changeMenu', menuKey);
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})