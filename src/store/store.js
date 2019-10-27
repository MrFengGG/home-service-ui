import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    contextConfig : {
        isSlideCollpase : true,      //侧边栏是否展开
        menuGroupCpde : "plat"       //当前菜单组
    }
}

const getters = {
    isSlideCollapse : function(state){
        return state.contextConfig.isSlideCollapse;
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
    }
}

const actions = {
    toggleSlideMenu({commit}){
        commit('toggleSlideMenu');
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})