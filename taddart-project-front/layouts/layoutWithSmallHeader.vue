<template>
  <div>
    <Header :small-header="true"></Header>
    <div>
        <nuxt/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  components: {Header},
}
</script>
