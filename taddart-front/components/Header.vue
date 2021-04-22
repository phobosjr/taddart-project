<template>
  <div :class="['Header', {'scrolled': isScrolled}, {'Header--small-height': smallHeader}]">
    <nav class="Header__navbar" :style="{ 'height': `${navHeight}px`}">
      <a class="Header__navbar__logo navbar-brand" href="/">
        <img :src="header.logo_image.formats | defaultImage" width="30" height="30"
             class="Header__navbar__logo__img d-inline-block align-top td-transition" alt="">
      </a>
      <div class="Header__navbar__menu">
        <div :class="['Header__navbar__menu__item', 'td-transition',
          {'Header__navbar__menu__item--open': navBarMenuOpened},
          {'Header__navbar__menu__item--scrolled': isScrolled}]">
          <a :href="localePath('index', $i18n.locale)">
            {{ $t('home_title') }}
          </a>
          <a :href="localePath('/gallery', $i18n.locale)">
            {{ $t('gallery_title') }}
          </a>
        </div>
        <div class="Header__navbar__menu__btn">
          <button type="button" @click="navBarMenuOpened = !navBarMenuOpened">
            <img src="~/assets/images/nav-menu-image.svg">
          </button>
        </div>

        <div class="Header__navbar__lang">
        <span>
          <img :class="['Header__navbar__lang__img', {'Header__navbar__lang__img--current': $i18n.locale === 'kb'}]"
               src="~/assets/images/header/kb-lang-32-32.png" alt="KB"
               @click="$i18n.setLocale('kb')">
        </span>
          <span>
          <img :class="['Header__navbar__lang__img', {'Header__navbar__lang__img--current': $i18n.locale === 'fr'}]"
               src="~/assets/images/header/fr-lang.svg" alt="FR"
               @click="$i18n.setLocale('fr')">
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
            :src="image.formats | defaultImage"
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
      isScrolled: false,
      navBarMenuOpened: false,
      navHeight: 120
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
      if (window.scrollY < 64) {
        this.navHeight = (120 -window.scrollY);
      }
      window.scrollY === 0
        ? (this.isScrolled = false)
        : (this.isScrolled = true);
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

$navbar-height: 120px;
$navbar-height-small: 60px;
.Header {
  position: relative;
  height: 37em;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &--small-height {
    height: 120px;
    background-color: rgba(96, 168, 239, 0.38) !important;
  }

  &__navbar {
    position: fixed;
    display: flex;
    justify-content: space-between;
    padding: 0 204px;
    width: 100%;
    z-index: 999;
    background-color: rgba(96, 168, 239, 0.38) !important;

    @media screen and (max-width: 992px) {
      padding: 0 53px;
    }

    &__logo {
      &__img {
        width: 100px;
        height: 100px;
      }
    }

    &__menu {
      display: flex;
      justify-content: right;
      align-items: center;

      &__item {
        margin-right: 10px;
        text-transform: uppercase;
        color: $td-blue;
        overflow: hidden;
        transition: all .5s ease;
        @media screen and (max-width: 992px) {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          display: flex;
          flex-direction: column;
          left: 0;
          top: $navbar-height;
          background-color: $td-blue;
          width: 100%;
          padding: 10px;
          &--open {
            visibility: visible;
            opacity: 1;
          }
          &--scrolled {
            top: $navbar-height-small;
          }
        }

        a {
          color: white;
          margin: 0 4px;
          font-weight: bold;
          @media screen and (max-width: 992px) {
            margin: 10px;
            color: white;
          }

          &:hover {
            color: $td-green;
            text-decoration: none;
          }
        }
      }

      &__btn {
        margin-right: 15px;

        @media screen and (min-width: 992px) {
          display: none;
        }
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

  &.scrolled {
    .Header__navbar {
      background-color: $td-blue !important;
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
  transition: all 0.25s ease;
}
</style>
