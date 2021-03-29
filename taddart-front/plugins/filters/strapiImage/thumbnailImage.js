import Vue from 'vue'

Vue.filter('thumbnailImage', function (formats) {
  return 'http://192.168.1.93:1337' + formats?.thumbnail?.url
});
