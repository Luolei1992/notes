import {REDUCE} from './types'

const mutations = {
  [REDUCE](state,num){
    state.numReduce -= num
  }
}

export default mutations