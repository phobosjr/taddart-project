import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function (value, dayOnly) {
  if (value) {

   return  dayOnly ? moment(String(value)).format('DD/MM/YYYY') : moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});
