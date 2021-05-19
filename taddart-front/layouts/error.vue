<template>
  <div class="Error">
    <h1 v-if="error.statusCode === 404">
      {{ $t('error_page_not_found') }}
    </h1>
    <h1 v-else>
      {{ $t('error_page_error_occurred') }}
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  layout: 'layoutWithSmallHeader',
  head() {
    const title =
      this.error.statusCode === 404 ? this.$t('error_page_not_found') : this.$t('error_page_error_occurred')
    return {
      title
    }
  }
}
</script>

<style scoped>
.Error {
  height: 100vh;
  position: relative;
}

h1 {
  width: fit-content;
  height: fit-content;
  margin: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
