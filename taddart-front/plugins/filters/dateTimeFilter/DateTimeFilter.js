import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function (value, dayOnly, format) {
  if (!value) {
    return;
  }
  // moment.locale('fr')
  if (dayOnly) {
    return moment(String(value)).format('DD/MM/YYYY');
  } else {
    if (format) {
      return moment(String(value)).format(format)
    } else {
      return moment(String(value)).format('DD/MM/YYYY hh:mm')
    }
  }
});
