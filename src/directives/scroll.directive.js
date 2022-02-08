export default {
  bind: function (el, binding) {
    if (typeof binding.value !== 'function') return;
    el.__callback__ = (event) => {
      if (binding.arg == 'top') {
        if (!el) return;
        const isTop = el.scrollTop==0;
        if (!isTop) return;
        binding.value(event, el);
      } else if (binding.arg == 'bottom') {
        if (!el) return;
        const isBottom = Math.ceil(el.offsetHeight + el.scrollTop) >= el.scrollHeight;
        if (!isBottom) return;
        binding.value(event, el);
      } else {
        binding.value(event, el);
      }
    }
    el.addEventListener('scroll', el.__callback__);
  },
  unbind: function (el) {
    el.removeEventListener('scroll', el.__callback__);
    el.__callback__ = null;
  }
}