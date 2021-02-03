import { Auth } from 'aws-amplify'
import router from '../../../router'

export default {
  loginUser({ commit }, user) {
    commit("USER_LOGIN", user);
  },
  async logoutUser({ commit }) {
    await Auth.signOut({
      global: true
    })
    commit("USER_LOGOUT");
    router.push('/')
  },
  async signUp({ commit }, form) {
    const user = await Auth.signUp({
      username: form.username,
      password: form.password,
      attributes: {
        name: form.name,
      }
    });
    commit("USER_SIGNUP", user);
  },
}