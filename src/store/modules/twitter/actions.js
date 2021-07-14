import {
  getMyProfile,
  getMyTimeline, tweet
} from '../../../lib/backend'

export default {
  async setProfile({ commit, dispatch }) {
    const profile = await getMyProfile();
    await dispatch("getMyTimeline", 10);
    commit("PROFILE_SET", profile);
  },

  async getMyTimeline({ commit }, limit) {
    const timeline = await getMyTimeline(limit);
    commit("TWITTER_TIMELINE", timeline);
  },
  async createTweet({ commit, dispatch }, { text }) {
    const newTweet = await tweet(text);
    commit("TWITTER_CREATE", newTweet);
    dispatch("getMyTimeline", 10);
  }
};