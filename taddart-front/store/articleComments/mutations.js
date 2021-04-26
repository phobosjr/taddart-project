export default {
  init(state, comments) {
    state.comments = comments;
  },
  add(state, comment) {
    state.comments = [comment].concat(state.comments);
  }
}