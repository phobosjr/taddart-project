import Vue from 'vue'

Vue.filter('thumbnailImage', function (formats) {
  return formats?.thumbnail?.url
});
