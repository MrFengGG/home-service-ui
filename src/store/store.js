import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const State = {
    contextConfig : {
        isSlideCollpase : true      //侧边栏是否展开
    }
}

const Getters = {
    isSlideCollapse : function(State){
        return State.contextConfig.isSlideCollapse;
    }
}

const Mutations = {
    toggleSlideMenu(State){
        State.contextConfig.isSlideCollapse = !State.contextConfig.isSlideCollapse;
    },
    showSlideMenu(State){
        State.contextConfig.isSlideCollapse = true;
    },
    hideSlideMenu(State){
        State.contextConfig.isSlideCollapse = false;
    }
}

const Actions = {
    toggleSlideMenu({commit}){
        commit('toggleSlideMenu');
    }
}

export default new Vuex.Store({
    State,
    Actions,
    Mutations,
    Getters
})