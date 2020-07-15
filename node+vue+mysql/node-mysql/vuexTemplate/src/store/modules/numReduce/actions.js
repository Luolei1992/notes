import {REDUCE} from './types'

const actions = {
  reducenum({commit},num){
    commit(REDUCE,num)
  }
}

export default actions