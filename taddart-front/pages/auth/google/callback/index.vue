<template>

</template>

<script>
export default {
  name: "index",
  layout: 'layoutWithSmallHeader',
  async created() {
    if (process.client) {
      const lastPath = this.$cookies.get('last_path');
      this.$cookies.remove('last_path');
      const acces_token_regex = new RegExp('(?<=access_token=).*?(?=&)');
      const [access_token] = acces_token_regex.exec(this.$route.fullPath);
      const strapiBackendUrl = process.client ? this.$config.clientSide.strapiBackendUrl : this.$config.serverSide.strapiBackendUrl;
      const response = await this.$axios.$get(`${strapiBackendUrl}/auth/google/callback?access_token=${access_token}`);
      console.log({
        access_token,
        strapiBackendUrl,
        response
      })
      this.$cookies.set('strapi_jwt', response.jwt);
      this.$cookies.set('user_access_token', access_token);
      window.location = lastPath || '/';
    }
  }
}
</script>

<style scoped>

</style>
