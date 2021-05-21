import userQuery from "@/apollo/queries/user/user.gql";

const userTokenCookieName = 'tuddar_jwt';
export default {
  async 'fetch'(context) {
    const userToken = this.$cookies.get(userTokenCookieName);
    if (!userToken) {
      return;
    }
    try {
      const result = await this.app.apolloProvider.clients.clientSideClient.query({
        query: userQuery,
        context: {
          headers: {'Authorization': `Bearer ${userToken}`}
        }
      })
      context.commit('SET_USERNAME', result.data.me.username);
      context.commit('SET_TOKEN', userToken);
    } catch (err) {
      if (err?.response && err?.response?.status === 400) {
        this.$cookies.remove(userTokenCookieName);
      }
    }
  },
  'logout'(context) {
    const userAccessToken = this.$cookies.get(userTokenCookieName);
    this.$axios.post(`https://oauth2.googleapis.com/revoke?token=${userAccessToken}`)
      .finally(() => {
        this.$cookies.remove(userTokenCookieName);
        context.commit('REMOVE_USER');
        this.$router.go(0);
      })
  }
}
