export default {
  USER_LOGIN(state, user) {
    state.user = user;
    state.loggedIn = true;
  },
  USER_LOGOUT(state) {
    state.loggedIn = false;   
    state.user = undefined;
  },
  USER_SIGNUP(state, user) {
    state.user = user;
  }
}