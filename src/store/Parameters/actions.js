export default {
  async GET_TOUCH_PARAMETERS({ commit }) {
    const resp = {}
    commit('SET_TOUCH_PARAMETERS', resp)
    return resp.data
  },
}
