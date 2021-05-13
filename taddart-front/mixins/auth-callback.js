export default {
  methods: {
    async callback(provider){
      if (process.client) {
        const lastPath = this.$cookies.get('last_path');
        this.$cookies.remove('last_path');
        const acces_token_regex = new RegExp('(?<=access_token=).*?(?=&)');
        const [access_token] = acces_token_regex.exec(this.$route.fullPath);
        this.$cookies.set('user_access_token', {
          access_token,
          provider
        });
        await this.$store.dispatch("user/fetchUser");
        window.location = lastPath || '/';
      }
    }
  }
}
