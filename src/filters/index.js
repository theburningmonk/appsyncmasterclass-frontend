import timeago from './timeago';

export default {
  install(Vue) {
    Vue.filter('timeago', timeago);
  }
}