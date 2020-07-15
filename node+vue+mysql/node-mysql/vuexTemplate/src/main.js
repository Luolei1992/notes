import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store' // 引入

Vue.config.productionTip = false

new Vue({ 
  el: '#app', 
  router, 
  store, // 注入全局
  render: h => h(App) 
})