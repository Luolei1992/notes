import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'

import numPlus from './modules/numPlus'
import numReduce from './modules/numReduce'

Vue.use(Vuex)

const store = new Vuex.Store({
  // actions,
  // mutations,
  modules:{
    numPlus,
    numReduce
  }
})
export default store