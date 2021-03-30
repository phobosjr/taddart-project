import Vue from 'vue'

function getPictureUrl (formats) {
  return formats?.medium ? formats.medium.url : formats?.small?.url;
}

Vue.filter('defaultImage', function (formats) {
  return 'http://192.168.1.93:1337' + getPictureUrl(formats)
});
