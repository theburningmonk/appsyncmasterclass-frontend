import Moment from 'moment';

export default {
  profile: state => state.profile,
  tweets: state => state.tweets.tweets,
  nextTokenTweets: state => state.tweets.nextToken,
  joinedDate: state => Moment(state.profile.createdAt).format('MMMM YYYY'),
  isSelf: state => screenName => state.profile.screenName == screenName,
};