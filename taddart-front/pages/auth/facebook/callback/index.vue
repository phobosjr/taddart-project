<template>

</template>

<script>
import authCallback from "@/mixins/auth-callback";

export default {
  name: "index",
  layout: 'layoutWithSmallHeader',
  mixins: [authCallback],
  async mounted() {
    await this.callback('facebook');
  }
}
</script>

<style scoped>

</style>
