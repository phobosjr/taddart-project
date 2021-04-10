<template>
  <nav class="Footer navbar navbar-dark bg-dark justify-content-center">
    <span class="Footer Footer__copyright_white">&copy;Copyright Tuddart N'at abdelmumen {{ new Date().getFullYear() }}</span>
  </nav>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss" scoped>
.Footer {
  &.Footer__copyright_white {
    color: white;
  }


}


</style>
