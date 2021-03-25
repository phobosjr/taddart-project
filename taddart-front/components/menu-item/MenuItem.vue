<template>
  <li class="nav-item">
    <a class="nav-link page-scroll" :href="menuLink">{{ menuLabel }}</a>
  </li>
</template>

<script>
export default {
  name: "menuItem",
  props: {
    menuLink: {type: String, required: true},
    menuLabel: {type: String, required: true},
  }
}
</script>

<style scoped>

</style>
