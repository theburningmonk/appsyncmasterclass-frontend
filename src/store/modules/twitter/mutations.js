export default {
  PROFILE_SET(state, profile) {
    state.profile = profile;
  },

  TWITTER_TIMELINE(state, { tweets, nextToken }) {
    state.tweets.tweets = tweets;
    state.tweets.nextToken = nextToken;
  },
  TWITTER_CREATE(state, newTweet) {
    const tweets = [...state.tweets.tweets];
    state.tweets.tweets = tweets.unshift(newTweet);
  },

  TWITTER_FOLLOWERS(state, { profiles, nextToken }) {
    state.followers.followers = profiles;
    state.followers.nextToken = nextToken;
  },
  TWITTER_FOLLOWING(state, { profiles, nextToken }) {
    state.following.following = profiles;
    state.following.nextToken = nextToken;
  },

  TWITTER_LOADMORE_TWEETS(state, { tweets, nextToken }) {
    state.tweets.tweets = [...state.tweets.tweets, ...tweets];
    state.tweets.nextToken = nextToken;
  },

  TWITTER_SEARCH(state, { results, nextToken }) {
    state.search.results = results;
    state.search.nextToken = nextToken;
  },
  TWITTER_LOADMORE_SEARCH(state, { results, nextToken }) {
    state.search.results = [...state.search.results, ...results];
    state.search.nextToken = nextToken;
  },

  TWITTER_SEARCH_HASHTAG(state, { results, nextToken }) {
    state.search.results = results;
    state.search.nextToken = nextToken;
  },
  TWITTER_LOADMORE_SEARCH_HASHTAG(state, { results, nextToken }) {
    state.search.results = [...state.search.results, ...results];
    state.search.nextToken = nextToken;
  },

  TWITTER_NOTIFICATIONS_SUBSCRIBE(state, subscription) {
    state.notifications.subscription = subscription;
    state.notifications.newNotifications = 0;
  },
  TWITTER_NOTIFICATIONS_UNSUBSCRIBE(state) {
    let subscription = state.notifications.subscription;
    if (subscription) {
      subscription.unsubscribe();
      state.notifications.subscription = undefined;
    }
  },
  TWITTER_NOTIFICATIONS_NEW(state, newMessage) {
    if (newMessage?.type == 'Mentioned') {
      state.notifications.mentions = [newMessage, ...state.notifications.mentions]; // reverse add order
    } else {
      state.notifications.all = [newMessage, ...state.notifications.all]; // reverse add order
    }
    state.notifications.newNotifications = state.notifications.newNotifications + 1;
  },
  TWITTER_NOTIFICATIONS_RESET(state) {
    state.notifications.newNotifications = 0;
  },

  TWITTER_RESET_STATE(state) {
    Object.assign(state, {
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
    });
  }
};