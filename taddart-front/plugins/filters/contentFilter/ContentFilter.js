import Vue from 'vue'

Vue.filter('contentFilter', function (value) {
  const figureRegex = new RegExp('(?=<figure).*(?<=figure>)');
  const styleRegex = new RegExp('(?=style=").*(")');
  return String(value).substring(0, 600).replace(figureRegex, '').replace(styleRegex, '');
});
