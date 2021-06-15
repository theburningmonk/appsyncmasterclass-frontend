import {
  getMyProfile
} from '../../../lib/backend'

export default {
  async setProfile({ commit }) {
    const profile = await getMyProfile();
    commit("PROFILE_SET", profile);
  },
};