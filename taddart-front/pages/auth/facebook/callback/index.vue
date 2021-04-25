<template>

</template>

<script>
export default {
  name: "index",
  layout: 'layoutWithSmallHeader',
  async middleware({redirect, $cookies, $axios, route}) {
    const lastPath = $cookies.get('last_path');
    $cookies.remove('last_path');
    const idToken = route.fullPath.split('?id_token=')[1];
    const response = await $axios.$get(`/auth/google/callback/?id_token=${idToken}`);
    $cookies.set('strapi_jwt', response.jwt)
    return redirect(lastPath || '/');
  }
}
</script>

<style scoped>

</style>
