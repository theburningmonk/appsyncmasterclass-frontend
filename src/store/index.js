import Vue from 'vue';
import Vuex from  'vuex';
import authentication from './modules/authentication';
import signup from './modules/signup';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    signup,
  }
})