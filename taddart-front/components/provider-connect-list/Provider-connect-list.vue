<template>
  <div v-if="show" class="providers">
    <div class="providers__main">
      <div class="providers__main__close" @click="hide()">
        <img src="~/assets/images/close-image.svg">
      </div>
      <div class="providers__main__title">
        <h3>{{ $t('provides_list_title_label') }}</h3>
      </div>
      <button class="providers__main__btn--google" @click="connect('google')">Google</button>
      <span>{{ $t('or_label') }}</span>
      <button class="providers__main__btn--facebook" @click="connect('facebook')">Facebook</button>
    </div>
    <div class="td-overlay" @click="hide()"></div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Provider-connect-list",
  computed: {
    ...mapGetters({
      show: 'providers/show'
    })
  },
  methods: {
    connect(provider) {
      this.$cookies.set('last_path', this.$router.currentRoute.path);
      this.$store.dispatch('providers/hide');
      window.location = `${this.$config.strapiBackendUrl}/connect/${provider}/`;
    },
    hide() {
      this.$store.dispatch('providers/hide');
    }
  }
}
</script>

<style lang="scss" scoped>
.providers {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;

  .td-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  &__main {
    background-color: white;
    height: 550px;
    width: 600px;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 999;
    margin: auto;
    top: 0;
    bottom: 0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px 0;

    &__close {
      position: absolute;
      top: 10px;
      right: 25px;
      cursor: pointer;

      img {
        width: 25px;
        height: 25px;
      }
    }

    &__title {
      margin: 25px;
      text-transform: uppercase;
    }

    &__btn {
      &--google {
        padding: 10px;
        width: 110px;
        margin: 10px;
        border-radius: 10px;
        background-color: #db3236;
        color: white;
        font-weight: bold;

      }

      &--facebook {
        padding: 10px;
        width: 110px;
        margin: 10px;
        border-radius: 10px;
        background-color: #3b5998;
        color: white;
        font-weight: bold;
      }
    }


  }
}
</style>
