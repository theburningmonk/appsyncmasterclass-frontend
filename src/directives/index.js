import escape from './escape.directive';

export default {
  install(Vue) {
    Vue.directive('escape', escape);
  }
}