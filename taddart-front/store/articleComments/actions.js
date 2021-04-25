export default {
  init({commit, state}, comments) {
    commit('init', comments);
  },
  add({commit}, comment) {
    commit('add', comment);
  }
}
