import Vue from 'vue';
import Router from 'vue-router';
import Anxious from '../components/Anxious.vue';
import Healthy from '../components/Healthy.vue';
import Sleep from '../components/Sleep.vue';
import End from '../components/End.vue';
import Home from '../components/Home.vue';
Vue.use(Router);
const router = new Router({
  routes:[
    {
      path:'/',
      name:'Home',
      component:Home
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      path:'/anxious',
      name:'Anxious',
      component:Anxious
    },
    {
      path:'/healthy',
      name:'Healthy',
      component:Healthy
    },
    {
      path:'/sleep',
      name:'Sleep',
      component:Sleep
    },
    {
      path:'/end',
      name:'End',
      component:End
    },
  ]
})

export default router;