export default {
  PROFILE_SET(state, profile) {
    state.profile = profile;
  },

  TWITTER_TIMELINE(state, timeline) {
    state.tweets = timeline;
  },
  TWITTER_CREATE(state, newTweet) {
    const tweets = [...state.tweets.tweets];
    state.tweets.tweets = tweets.unshift(newTweet);
  }
};