import Moment from 'moment';

export default {
  profile: state => state.profile,
  tweets: state => state.tweets.tweets,
  nextTokenTweets: state => state.tweets.nextToken,
  joinedDate: state => Moment(state.profile.createdAt).format('MMMM YYYY'),
  isSelf: state => screenName => state.profile.screenName == screenName,
  followers: state => state.followers.followers,
  nextTokenFollowers: state => state.followers.nextToken,
  following: state => state.following.following,
  nextTokenFollowing: state => state.following.nextToken,
  search: state => state.search.results,
  nextTokenSearch: state => state.search.nextToken,
  searcHashTag: state => state.search.results,
  nextTokenSearchHashTag: state => state.search.nextToken,
  all: state => state.notifications.all,
  mentions: state => state.notifications.mentions,
  newNotifications: state => state.notifications.newNotifications,
  subscription: state => state.notifications.subscription,

  newMessages: state => state.notifications.messages.newMessages,
  conversationsSet: state => state.notifications.messages.conversationsSet,
  hasNewMessages: state => conversation => {
    const set = state.notifications.messages.conversationsSet;
    const active = state.notifications.messages.active.conversation;
    return set.has(conversation.id) && (
      (active && conversation.id != active.id) || !active
    )
  },
  conversations: state => state.notifications.messages.conversations,
  nextTokenConversations: state => state.notifications.messages.conversations.nextToken,
  messages: state => state.notifications.messages.active.messages,
  nextTokenMessages: state => state.notifications.messages.active.nextTokenMessages,
  conversation: state => state.notifications.messages.active.conversation,
};