import moment from 'moment';

moment.updateLocale('en', {
  monthsShort: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
});

export default function time(_date) {
  const date = moment(_date);
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'day').startOf('day');

  if (date <= yesterday) { // Jan 31, 6:30 PM
    return date.format("MMM D, h:mm A");
  } else if (date <= today) { // Yesterday, 6:30 PM
    return `Yesterday, ${date.format("h:mm A")}`;
  } else { // 6:30 PM
    return date.format("h:mm A");
  }
}