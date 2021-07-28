import {
  getMyProfile,
  getMyTimeline, tweet,
  like, unlike, retweet, unretweet
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
  },

  async likeTweet(_, tweetId) {
    await like(tweetId);
  },
  async unlikeTweet(_, tweetId) {
    await unlike(tweetId);
  },
  async retweetTweet(_, tweetId) {
    await retweet(tweetId);
  },
  async unretweetTweet(_, tweetId) {
    await unretweet(tweetId);
  },
};