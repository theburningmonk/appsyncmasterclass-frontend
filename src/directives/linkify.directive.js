import linkifyHtml from 'linkify-html';
import 'linkify-plugin-hashtag';
import 'linkify-plugin-mention';

const options = {
  formatHref: {
    hashtag: (href) => `#/hashtag?m=Latest&hash=${Date.now()}&q=${escape('#' + href.substr(1))}`,
    mention: (href) => `#/${href.substr(1)}`
  },
  target: (href, type) => (type == 'mention' || type == 'hashtag') ? undefined : '_blank',
  truncate: 25,
  ignoreTags: ['script', 'style']
}

export default {
  bind: function (el) {
    let text = el.innerHTML;
    el.innerHTML = linkifyHtml(text, options);
  },
}