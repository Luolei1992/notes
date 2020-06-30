import * as types from './mutation-types'

const actions = {
  setAnxiousQuestion ({ commit, state }, list) {
    commit(types.PARTONE, list);
  },
  setHealthyQuestion ({ commit, state }, list) {
    commit(types.PARTWO, list);
  },
  setSleepQuestion ({ commit, state }, list) {
    commit(types.PARTTHREE, list);
  },
  setUserInfo ({ commit, state }, id) {
    commit(types.USERINFO, id);
  },
  setUserName ({ commit, state }, name) {
    commit(types.USERID, name);
  },
  setHospitalCode ({ commit, state }, code) {
    commit(types.HOSPITALCODE, code);
  },
}
export default actions