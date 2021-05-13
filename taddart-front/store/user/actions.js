export default {
  fetchUser(context) {
    const userAccessToken = this.$cookies.get('user_access_token');
    if (!context.state.userData?.username && userAccessToken) {
      const strapiBackendUrl = process.client ? this.$config.clientSide.strapiBackendUrl : this.$config.serverSide.strapiBackendUrl;
      const userResponse = this.$axios.$get(`${strapiBackendUrl}/auth/${userAccessToken.provider}/callback?access_token=${userAccessToken.access_token}`)
        .then((userResponse)=> {
          context.commit('SET_USER', userResponse.user);
          context.commit('SET_TOKEN', userResponse.jwt);
        }).catch((err)=> {
          if(err?.response && err?.response?.status === 400) {
            this.$cookies.remove('user_access_token');
          }
        });
    }
  },
  logout(context) {
    const userAccessToken = this.$cookies.get('user_access_token');
    this.$axios.post(`https://oauth2.googleapis.com/revoke?token=${userAccessToken}`)
      .finally(() => {
        this.$cookies.remove('user_access_token');
        context.commit('REMOVE_USER');
        this.$router.go(0);
      })
  }
}
