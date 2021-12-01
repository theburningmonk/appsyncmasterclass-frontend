import escape from './escape.directive';
import scroll from './scroll.directive';
import linkify from './linkify.directive';

export default {
  install(Vue) {
    Vue.directive('escape', escape);
    Vue.directive('scroll', scroll);
    Vue.directive('linkify', linkify);
  }
}