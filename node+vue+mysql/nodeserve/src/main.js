import Vue from 'vue'
import App from './App.vue'

import router from './router'
import PortalVue from 'portal-vue';

// import Picker from 'vant/lib/button';
import { Picker,Popup, Dialog, Overlay } from 'vant';
import 'vant/lib/picker/style';
import 'vant/lib/popup/style';
import 'vant/lib/dialog/style';
import 'vant/lib/overlay/style';
import md5 from 'js-md5';
import store from './store' // 引入

// Vue.use(Vant);

Vue.use(Picker)
Vue.use(Popup)
Vue.use(Dialog)
Vue.use(Overlay)
Vue.use(PortalVue)
Vue.prototype.md5 = md5
Vue.config.productionTip = false

new Vue({ 
  el: '#app', 
  router, 
  store, // 注入全局
  render: h => h(App)
})