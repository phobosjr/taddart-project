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
    margin: 13px auto 0;
    width: 100%;
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(7, 7, 7, 0.75), rgba(255, 255, 255, 0));
  }
}
</style>
