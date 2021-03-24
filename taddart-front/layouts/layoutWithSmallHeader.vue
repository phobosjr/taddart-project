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
}
</script>

<style lang="scss" scoped>
.Default-layout {

  .Default-layout__main {
    height: 100vh;
  }
}
</style>
