<template>
  <div class="Separate-line">
    <div class="text-center">
      <h3>{{ textContent }}</h3>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: "SeparateLine",
  props: {
    textContent: {type: String, required: false, default: ''}
  }
}
</script>

<style lang="scss" scoped>

.Separate-line {
  margin: 40px auto;
  width: fit-content;

  hr {
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(7, 7, 7, 0.75), rgba(255, 255, 255, 0));
  }
}
</style>
