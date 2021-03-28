<template>
  <div :class="['Header', {'scrolled': isScrolled}, 'td-transition', {'Header--small-height': smallHeader}]"
       :style="{backgroundImage: 'url()'}">
    <nav class="Header__navbar navbar navbar-light position-fixed td-transition">
      <nuxt-link class="Header__navbar__logo navbar-brand" to="/">
        <img :src="'http://localhost:1337'+header.logo_image.url" width="30" height="30"
             class="Header__navbar__logo__img d-inline-block align-top td-transition" alt="">
      </nuxt-link>
      <div class="Header__menu d-flex justify-content-end">
        <div class="Header__menu__item">
          <a href="/">
            Accueil
          </a>

          <a href="/gallery">
            Gallery
          </a>

          <a href="/contact">
            Contact
          </a>
        </div>
        <div class="Header__navbar__lang">
        <span>
          <img :class="['Header__navbar__lang__img', {'Header__navbar__lang__img--current': locale === 'kb'}]"
               src="~/assets/images/header/kb-lang-32-32.png" alt="KB"
               @click="switchLocale('kb')">
        </span>
          <span>
          <img :class="['Header__navbar__lang__img', {'Header__navbar__lang__img--current': locale === 'fr'}]"
               src="~/assets/images/header/fr-lang.svg" alt="FR"
               @click="switchLocale('fr')">
        </span>
        </div>
      </div>
    </nav>
    <b-carousel
      :interval="20000"
      fade
      indicators
      style="height: 100%"
      v-if="!smallHeader"
    >
      <b-carousel-slide v-for="(image, index) in header.background_image" :key="index" class="Header__slider">
        <template v-slot:img>
          <img
            class="d-block Header__slider__img"
            :src="'http://localhost:1337'+image.url"
            alt="image slot">
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>
<script>
import headerQuery from '@/apollo/queries/header/header.gql'
import {mapGetters} from 'vuex'

export default {
  props: {
    smallHeader: {type: Boolean, required: false, default: false}
  },

  data: () => {
    return {
      isScrolled: false
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    })
  },
  apollo: {
    header: {
      prefetch: true,
      query: headerQuery
    }
  },
  methods: {
    handleScroll() {
      window.scrollY === 0
        ? (this.isScrolled = false)
        : (this.isScrolled = true);
    },
    switchLocale(lang) {
      this.$store.dispatch('switchLocale', lang);
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>
<style lang="scss" scoped>

.Header {
  position: relative;
  height: 37em;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &--small-height {
    height: 120px;
  }

  &__navbar {
    height: 120px;
    padding: 0 204px;
    background-color: rgba(96, 168, 239, 0.38) !important;
    width: 100%;
    z-index: 999;

    @media screen and (max-width: 992px) {
      padding: 0 53px;
    }

    &__logo {
      &__img {
        width: 100px;
        height: 100px;
      }
    }

    &__lang {
      &__img {
        width: 20px;
        height: 20px;
        cursor: pointer;
        opacity: .25;
        border-radius: 10px;
        &--current {
          opacity: 1 !important;
          cursor: default !important;
        }
      }
    }
  }

  &__slider {
    position: relative;
    margin-bottom: 0;
    width: 100%;
    height: 100%;

    &__img {
      width: 100%;
      height: 37em;
      background-size: cover;
      list-style-type: none;
      z-index: 1;
      object-fit: cover;
    }
  }

  &__menu__item {
    margin-right: 10px;
    text-transform: uppercase;
  }

  &.scrolled {
    height: 13em;

    .Header__navbar {
      height: 60px;
      background-color: rgba(96, 168, 239, 0.85) !important;

      .Header__navbar__logo {
        .Header__navbar__logo__img {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}

.td-transition {
  transition: all 0.25s cubic-bezier(.6, .04, .98, .34);
}
</style>
