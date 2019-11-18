import Vue from 'vue'
import router from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store/store'
import componentUtils from './util/components'
import 'font-awesome/css/font-awesome.min.css' 
import './assets/css/main.css'
import iconPicker from 'vue-fontawesome-elementui-icon-picker';
import VueParticles from 'vue-particles'  

//require('../mock/mock.js')
Vue.use(VueParticles)  
Vue.prototype.$componentUtils = componentUtils;
Vue.use(ElementUI)
Vue.use(iconPicker);
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if(!to.meta.needLogin || store.getters.token){
    next();
  }else{
    console.log(111)
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
