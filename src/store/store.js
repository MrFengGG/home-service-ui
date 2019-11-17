import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    contextConfig : {
        isSlideCollpase : false,
    },
    contextData : {
        token : "855af28f-a99c-4bf4-9315-66cdec904b69",
        menuGroup : "plat"
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
        state.contextData.token = token;
    },
    changeMenuGroup(state, groupName){
        state.contextData.menuGroup = groupName;
    }
}

const actions = {
    toggleSlideMenu({commit}){
        commit('toggleSlideMenu');
    },
    changeMenuGroup({commit}, groupName){
        commit('changeMenuGroup', groupName);
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})