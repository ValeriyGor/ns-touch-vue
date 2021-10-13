import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default {
  strict: false,
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
