<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" :fill="backgroundColor" viewBox="0 0 14 13">
    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
  </svg>
</template>

<script>
export default {
  name: "td-arrow-right",
  props: {
    backgroundColor: {type: String, required: false, default: 'black'},
    active:  {type: Boolean, required: false, default: false}
  }
}
</script>

<style lang="scss" scoped>
</style>
