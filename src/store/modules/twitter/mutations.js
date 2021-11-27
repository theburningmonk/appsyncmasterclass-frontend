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

  TWITTER_LOADMORE_TWEETS(state, timeline) {
    const { tweets, nextToken } = timeline;
    state.tweets.tweets = [...state.tweets.tweets, ...tweets];
    state.tweets.nextToken = nextToken;
  },

  TWITTER_SEARCH(state, searchResults) {
    state.search = searchResults;
  },
  TWITTER_LOADMORE_SEARCH(state, searchResults) {
    const { results, nextToken } = searchResults;
    state.search.results = [...state.search.results, ...results];
    state.search.nextToken = nextToken;
  }
};