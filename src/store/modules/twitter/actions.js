import {
  getMyProfile, getProfileByScreenName,
  getMyTimeline, tweet, getTweets,
  like, unlike, retweet, unretweet, reply
} from '../../../lib/backend'

export default {
  async setProfile({ commit }) {
    const profile = await getMyProfile();
    commit("PROFILE_SET", profile);
  },

  async loadProfile({ commit, rootState }, screenName) {
    if (!screenName) return;
    if (rootState.twitter.profile.screenName == screenName) {
      const profile = await getMyProfile();
      commit("PROFILE_SET", profile);
    } else {
      const profile = await getProfileByScreenName(screenName);
      commit("PROFILE_SET", profile);
    }
  },

  async loadMyTimeline({ dispatch }) {
    await dispatch("getMyTimeline", 10);
  },

  async loadTweets({ dispatch, rootState }, screenName) {
    if (!screenName) return;

    if (rootState.twitter.profile.screenName == screenName) {
      await dispatch("getTweets", { userId: rootState.twitter.profile.id, limit: 10 });
    } else {
      const profile = await getProfileByScreenName(screenName);
      await dispatch("getTweets", { userId: profile.id, limit: 10 });
    }
  },

  async getMyTimeline({ commit }, limit) {
    const timeline = await getMyTimeline(limit);
    commit("TWITTER_TIMELINE", timeline);
  },
  async createTweet({ commit, dispatch }, { text }) {
    const newTweet = await tweet(text);
    commit("TWITTER_CREATE", newTweet);
    await dispatch("getMyTimeline", 10);
  },

  async getTweets({ commit }, { userId, limit }) {
    const tweets = await getTweets(userId, limit);
    commit("TWITTER_TIMELINE", tweets);
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
  async replyTweet({ dispatch }, { tweetId, text }) {
    await reply(tweetId, text);
    await dispatch("getMyTimeline", 10);
  }
};