import Vue from 'vue'

function getPictureUrl (formats) {
  if (formats?.large){
    return formats?.large.url;
  }
  return formats?.medium ? formats.medium.url : formats?.small?.url;
}

Vue.filter('defaultImage', function (formats) {
  return getPictureUrl(formats)
});
