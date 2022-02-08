import timeago from './timeago';
import time from './time';

export default {
  install(Vue) {
    Vue.filter('timeago', timeago);
    Vue.filter('time', time);
  }
}