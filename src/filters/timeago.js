import moment from 'moment';

moment.updateLocale('en', {
  monthsShort: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
  relativeTime: {
    past: '%ss',
    s: 'Now',
    ss: '%ss',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
  }
});

export default function timeago(date) {
  if (moment().diff(date, "days") == 0) {
    return moment(date).fromNow(true);    // Now, 15s, 5m, 3h
  } else {
    return moment(date).format("MMM D");  // Jan 31
  }
}