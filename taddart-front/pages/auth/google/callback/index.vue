<template>

</template>

<script>
export default {
  name: "index",
  layout: 'layoutWithSmallHeader',
  middleware({$cookies, route}) {
    if (process.client) {
      const lastPath = $cookies.get('last_path');
      $cookies.remove('last_path');
      const acces_token_regex = new RegExp('(?<=access_token=).*?(?=&)');
      const [access_token] = acces_token_regex.exec(route.fullPath);
      $cookies.set('user_access_token', access_token);
      window.location = lastPath || '/';
    }
  }
}
</script>

