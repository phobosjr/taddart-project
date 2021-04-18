<template>
  <div class="Default-layout">
    <Header class="Default-layout__header" :small-header="true"></Header>
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
  .Default-layout__main {
    height: 100%;
  }
}
</style>
