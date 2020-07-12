import * as types from './types'

const mutations = {
  [types.PLUS](state,num){
    state.numPlus += num
  }
}

export default mutations;