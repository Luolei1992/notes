import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Page from '../components/Page.vue';
Vue.use(Router);
const router = new Router({
  routes:[
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      path:'/',
      name:'Page',
      component:Page
    },
  ]
})

export default router;