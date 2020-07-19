import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store' // 引入

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(Antd);

new Vue({ 
  el: '#app', 
  router, 
  store, // 注入全局
  render: h => h(App) 
})