import Vue from 'vue'
import moment from 'moment'

Vue.filter('numberViewFormat', function (value) {
  if (value) {
    const number = Number(value);
   return  number > 1000 ? (number / 1000).toFixed(1) +'K' : number;
  }
});
