import * as types from './mutation-types'

const gloableName = function({commit,state},{name}){
  console.log(name)
  commit(types.LOGIN_NAME, name);
}

export default {
  gloableName
}