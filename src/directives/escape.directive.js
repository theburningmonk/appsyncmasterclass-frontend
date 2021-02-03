export default {
  bind: function(el, binding) {
    if (typeof binding.value !== 'function') return;
    el.__callback__ = (event) => {
      if (event.keyCode === 27) {
        binding.value(event, el);
      }
    }
    el.addEventListener('keyup', el.__callback__);
  },
  unbind: function(el) {
    el.removeEventListener('keyup', el.__callback__);
    el.__callback__ = null;
  }
}