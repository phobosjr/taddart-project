<template>
  <div class="auth-callback"></div>
</template>

<script>
import authCallback from '@/mixins/auth-callback';

export default {
  name: "index",
  layout: 'layoutWithSmallHeader',
  mixins: [authCallback],
  async mounted() {
    await this.callback('google');
  }
}
</script>
<style lang="scss" scoped>
.auth-callback {
  height: 100vh;
}
</style>

