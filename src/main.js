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

//require('../mock/mock.js')

Vue.prototype.$componentUtils = componentUtils;

Vue.use(ElementUI)
Vue.use(iconPicker);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
