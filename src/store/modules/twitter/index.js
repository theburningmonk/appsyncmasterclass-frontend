import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const initialState = {
  profile: {
    id: '',
    createdAt: '1970-01-01',
    imageUrl: 'default_profile.png',
  },
  tweets: {
    tweets: [],
    nextToken: undefined,
  },
  followers: {
    followers: [],
    nextToken: undefined,
  },
  following: {
    following: [],
    nextToken: undefined,
  },
  search: {
    results: [],
    nextToken: undefined,
  },
  notifications: {
    all: [],
    mentions: [],
    newNotifications: 0,
    subscription: undefined,
  },
};
const state = () => ({...initialState});

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
}