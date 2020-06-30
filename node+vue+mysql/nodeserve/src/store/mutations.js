import Vue from 'vue'
import * as types from './mutation-types'

const mutations = {
  [types.PARTONE](state,list){
    state.anxiousQuestion = [...list];
  },
  [types.PARTWO](state,list){
    state.healthyQuestion = [...list];
  },
  [types.PARTTHREE](state,list){
    state.sleepQuestion = [...list];
  },
  [types.USERINFO](state,id){
    state.userId = id;
  },
  [types.USERID](state,name){
    state.userName = name;
  },
  [types.HOSPITALCODE](state,code){
    state.hospitalCode = code;
  },
}

export default mutations