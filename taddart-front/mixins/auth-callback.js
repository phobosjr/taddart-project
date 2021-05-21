export default {
  methods: {
    async callback(provider) {
      const lastPath = this.$cookies.get('last_path');
      this.$cookies.remove('last_path');
      const strapiBackendUrl = this.$config.clientSide.strapiBackendUrl;
      try {
        const userResponse = await this.$axios.$get(`${strapiBackendUrl}/auth/${provider}/callback?access_token=${this.$route.query['access_token']}`)
        this.$cookies.set('tuddar_jwt', userResponse.jwt);
      } catch (err) {
        console.error(err);
      }
      window.location = lastPath || '/';
    }
  }
}
