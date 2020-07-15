import * as types from './mutation-types'

const login = {
  [types.LOGIN_NAME](state,name){
    state.loginName = name;
  }
}

export default {login}