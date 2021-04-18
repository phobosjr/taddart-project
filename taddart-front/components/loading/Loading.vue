<template>
  <div v-if="loading" class="loading-page">
    <div class="loading-page__loading"></div>
    <div class="loading-page__label">
      {{$t('loading_label')}}
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: true,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>
<style  lang="scss" scoped>
.loading-page {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #000000cf;

  &__loading {
    display: inline-block;
    width: 4.5rem;
    height: 4.5rem;
    border: 6px solid rgba(9, 133, 81, 0.705);
    border-radius: 50%;
    border-top-color: #158876;
    animation: spin 1s ease-in-out infinite;
  }
  &__label {
    color: white;
    font-size: 30px;
  }
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
