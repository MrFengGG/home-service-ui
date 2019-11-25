import Vue from 'vue'
import ElementUI from 'element-ui'
import iconPicker from 'vue-fontawesome-elementui-icon-picker';
import FormMaking from 'form-making'
import formCreate, {maker} from '@form-create/element-ui'

import router from './router/router'
import App from './App.vue'
import store from './store/store'
import requests from './common/request'

import 'font-awesome/css/font-awesome.min.css' 
import 'element-ui/lib/theme-chalk/index.css'
import 'form-making/dist/FormMaking.css'
import './assets/css/main.css'


//require('../mock/mock.js')
Vue.use(ElementUI);
Vue.use(iconPicker);
Vue.use(FormMaking)
Vue.use(formCreate)
Vue.config.productionTip = false

Vue.prototype.$requests = requests;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
