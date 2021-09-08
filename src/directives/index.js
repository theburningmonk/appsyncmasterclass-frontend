import escape from './escape.directive';
import scroll from './scroll.directive';

export default {
  install(Vue) {
    Vue.directive('escape', escape);
    Vue.directive('scroll', scroll);
  }
}