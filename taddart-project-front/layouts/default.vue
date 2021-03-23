<template>
  <div>
    <Header></Header>
    <div>
        <nuxt/>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  components: {Header},
}
</script>
