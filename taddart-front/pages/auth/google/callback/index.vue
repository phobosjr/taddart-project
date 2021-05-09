<template>

</template>

<script>
export default {
  name: "index",
  layout: 'layoutWithSmallHeader',
  async middleware({redirect, $cookies, $axios, route, $config}) {
    const lastPath = $cookies.get('last_path');
    $cookies.remove('last_path');
    const acces_token_regex = new RegExp('(?<=access_token=).*?(?=&)');
    const [access_token] = acces_token_regex.exec(route.fullPath);
    const strapiBackendUrl = process.client ? $config.clientSide.strapiBackendUrl : $config.serverSide.strapiBackendUrl;
    const response = await $axios.$get(`${strapiBackendUrl}/auth/google/callback?access_token=${access_token}`);
    console.log({
      access_token,
      strapiBackendUrl,
      response
    })
    $cookies.set('strapi_jwt', response.jwt);
    $cookies.set('user_access_token', access_token);
    return redirect(lastPath || '/');
  }
}
</script>

<style scoped>

</style>
