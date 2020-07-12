import * as types from './types'

const actions = {
  plusnum({ commit, state },num){
    commit(types.PLUS,num)
  }
}

export default actions;