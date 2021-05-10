export default {
  SET_USER(state, user) {
    state.userData = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  REMOVE_USER(state) {
    state.userData = null;
    state.token = null;
  }
}
