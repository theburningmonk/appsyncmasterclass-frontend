import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = () => ({
  loggedIn: false,
  user: undefined,
});

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
}