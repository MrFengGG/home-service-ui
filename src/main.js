import Vue from 'vue'
import router from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store/store'
import components from './common/components'
import 'font-awesome/css/font-awesome.min.css' 
import './assets/css/main.css'
import iconPicker from 'vue-fontawesome-elementui-icon-picker';
import VueParticles from 'vue-particles'  
import requests from './common/request'

//require('../mock/mock.js')
Vue.use(VueParticles);
Vue.use(ElementUI);
Vue.use(iconPicker);
Vue.config.productionTip = false

Vue.prototype.$components = components;
Vue.prototype.$requests = requests;

router.beforeEach((to, from, next) => {
    if(to.meta.needLogin && !store.getters.token){
      //登录拦截
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }else{
      if(!store.getters.hasInitMenu){
        //刷新页面重载路由
        store.dispatch('initMenu').then(function(){
          next({ ...to, replace: true });
        })
      }else{
        next();
      }
    }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
