export default {
  SET_USERNAME(state, username) {
    state.username = username;
    state.isAuthenticated = true;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  REMOVE_USER(state) {
    state.userData = null;
    state.isAuthenticated = false;
    state.token = null;
  }
}
