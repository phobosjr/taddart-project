import Vue from 'vue'

Vue.filter('contentFilter', function (value) {
  const regex = new RegExp('(?=<figure).*(?<=figure>)');
  return String(value).substring(0,600).replace(regex, '');
});
