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
    state.notifications.messages.newMessages = 0;
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

  TWITTER_CONVERSATIONS_LOAD(state, { conversations, nextToken }) {
    state.notifications.messages.conversations = conversations;
    state.notifications.messages.nextToken = nextToken;
  },
  TWITTER_MESSAGES_NEW(state, notification) {
    let set = state.notifications.messages.conversationsSet;
    let c = state.notifications.messages.active.conversation;
    const conversationId = state.profile.id < notification.otherUserId
      ? `${state.profile.id}_${notification.otherUserId}`
      : `${notification.otherUserId}_${state.profile.id}`;

    // if conversation is active we ignore this
    const notActive = c => (!c || c.id != conversationId);
    if (notActive(c)) {
      if (!set.has(conversationId)) {
        set.add(conversationId);
      }
      state.notifications.messages.newMessages = state.notifications.messages.newMessages + 1;
      // trigger getters
      state.notifications.messages.conversations = [...state.notifications.messages.conversations];
    }
  },
  TWITTER_MESSAGES_RESET(state) {
    state.notifications.messages.newMessages = 0;
  },
  TWITTER_MESSAGES_LOAD(state, { messages, nextToken }) {
    state.notifications.messages.active.messages = messages;
    state.notifications.messages.active.nextTokenMessages = nextToken;
  },
  TWITTER_LOADMORE_MESSAGES(state, { messages, nextToken }) {
    state.notifications.messages.active.messages = [...state.notifications.messages.active.messages, ...messages];
    state.notifications.messages.active.nextTokenMessages = nextToken;
  },
  TWITTER_MESSAGES_SEND(state, newMessage) {
    state.notifications.messages.active.messages = [...state.notifications.messages.active.messages, newMessage];
  },
  TWITTER_CONVERSATION_ACTIVE_SET(state, conversation) {
    let set = state.notifications.messages.conversationsSet;
    if (set && conversation && set.has(conversation.id)) {
      set.delete(conversation.id);
      // we had a hit enough to clear all notifications in this implementation 
      // we still can show there's messages for other conversations with new messages just not how many messages
      state.notifications.messages.newMessages = 0;
    }
    state.notifications.messages.conversationsSet = set;
    state.notifications.messages.active.conversation = conversation;
    state.notifications.messages.active.messages = [];
    state.notifications.messages.active.nextTokenMessages = undefined;
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
        messages: {
          conversations: [],
          nextToken: undefined,
          newMessages: 0,
          conversationsSet: new Set(),
          active: {
            conversation: undefined,
            messages: [],
            nextTokenMessages: undefined,
          },
        },
      },
    });
  }
};