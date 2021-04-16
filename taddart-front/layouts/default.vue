<template>
  <div class="Default-layout">
    <Header class="Default-layout__header"></Header>
    <div class="Default-layout__main">
        <nuxt/>
    </div>
    <Footer class="Default-layout__footer"></Footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  components: {Header},
  mounted() {
    if(process.client) {
      this.$nextTick(() => {
        this.$nuxt.$loading.finish()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Default-layout {
  min-height: 100%;
  .Default-layout__main {
    min-height: 100vh;
  }
}
</style>
