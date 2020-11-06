import Vue from 'vue';
import Router from 'vue-router';
import Page from '../components/Page.vue';
Vue.use(Router);
const router = new Router({
  routes:[
    {
      path:'/',
      name:'Page',
      component:Page
    },
  ]
})

export default router;