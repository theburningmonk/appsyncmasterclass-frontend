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
  },
  
  TWITTER_FOLLOWERS(state, followers) {
    const { profiles, nextToken } = followers;
    state.followers.followers = profiles;
    state.followers.nextToken = nextToken;
  },
  TWITTER_FOLLOWING(state, following) {
    const { profiles, nextToken } = following;
    state.following.following = profiles;
    state.following.nextToken = nextToken;
  },
};