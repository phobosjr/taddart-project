<template>
  <div :class="['Header', {'scrolled': isScrolled}, {'Header--small-height': smallHeader}]">
    <nav class="Header__navbar">
      <div class="Header__navbar__menu">
        <div :class="['Header__navbar__menu__item', 'td-transition',
          {'Header__navbar__menu__item--open': navBarMenuOpened},
          {'Header__navbar__menu__item--scrolled': isScrolled}]">
          <a :href="localePath('index', $i18n.locale)">
            {{ $t('home_title') }}
          </a>
          <a :href="localePath('/articles', $i18n.locale)">
            {{ $t('articles_title') }}
          </a>
          <a :href="localePath('/gallery', $i18n.locale)">
            {{ $t('gallery_title') }}
          </a>
          <a :href="localePath('/contenu-numerique', $i18n.locale)">
            {{ $t('numeric_content_title') }}
          </a>
        </div>
        <button :class="['Header__navbar__menu__btn',{'Header__navbar__menu__btn--opened': navBarMenuOpened }]"
                aria-expanded="true" aria-label="Main Menu" @click="openNavBarMenu($event)">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path class="line line1"
                  d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"/>
            <path class="line line2" d="M 20,50 H 80"/>
            <path class="line line3"
                  d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"/>
          </svg>
        </button>
        <div v-if="username" class="Header__navbar__user">
          <div class="Header__navbar__user__logout-btn" @click="logout()"></div>
        </div>
      </div>
      <a class="Header__navbar__logo" href="/">
        <img :src="header.logo_image.formats | defaultImage"
             class="Header__navbar__logo__img"
             alt="">
      </a>
      <div class="Header__navbar__lang">
        <div class="Header__navbar__lang__selected" v-if="$i18n.locale === 'kab'" @click="openSelectLang($event)">
          {{ $t('lang_kab_label') }}
          <img :class="['Header__navbar__lang__img']"
               src="~/assets/images/header/kb-lang-32-32.png" alt="KAB">
        </div>
        <div class="Header__navbar__lang__selected" v-if=" $i18n.locale === 'fr'" @click="openSelectLang($event)">
          {{ $t('lang_fr_label') }}
          <img :class="['Header__navbar__lang__img']"
               src="~/assets/images/header/fr-lang.svg" alt="FR">
        </div>

        <div
          :class="['Header__navbar__lang__list', 'td-transition', {'Header__navbar__lang__list--opened': langListOpened}]">
          <a :href="switchLocalePath('kab')" :disabled="$i18n.locale === 'kab'">
            {{ $t('lang_kab_label') }}
            <img :class="['Header__navbar__lang__img']"
                 src="~/assets/images/header/kb-lang-32-32.png" alt="KAB">
          </a>
          <a :href="switchLocalePath('fr')" :disabled="$i18n.locale === 'fr'">
            {{ $t('lang_fr_label') }}
            <img :class="['Header__navbar__lang__img']"
                 src="~/assets/images/header/fr-lang.svg" alt="FR">
          </a>
        </div>
      </div>
    </nav>
    <div class="Header__hero-slider">
      <div class="Header__hero-slider__title">
        <h1>Tuddar n'at abdelmumen</h1>
      </div>
      <div v-for="(image, index) in sliderImages" :key="index"
           :class="['Header__hero-slider__image-item', `Header__hero-slider__image-item--${index}`, {'Header__hero-slider__image-item--active': index === 0} ]"
           :style="{backgroundImage: 'url('+getPictureUrl(image)+')'}"></div>
    </div>
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
      navHeight: 120,
      langListOpened: false,
      sliderIndex: 0,
      sliderTimeoutMs: 30000
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale'
    }),
    username() {
      return this.$strapi?.user?.username;
    },
    sliderImages () {
      return this.header?.background_image;
    }
  },
  apollo: {
    header: {
      prefetch: true,
      query: headerQuery
    }
  },
  mounted() {
    setInterval(() => {
      this.startSlider();
    }, this.sliderTimeoutMs)
  },
  methods: {
    handleScroll() {
      window.scrollY === 0
        ? (this.isScrolled = false)
        : (this.isScrolled = true);
    },
    logout() {
      const userAccessToken = this.$cookies.get('user_access_token');
      this.$axios.post(`https://oauth2.googleapis.com/revoke?token=${userAccessToken}`)
        .finally(() => {
          this.$cookies.remove('user_access_token');
          this.$strapi.clearToken();
          this.$router.go(0);
        })
    },
    openSelectLang($event) {
      $event.stopPropagation();
      this.langListOpened = !this.langListOpened;
      window.addEventListener('click', () => {
        this.langListOpened = false;
      }, {
        once: true
      })
    },
    openNavBarMenu($event) {
      $event.stopPropagation();

      this.navBarMenuOpened = !this.navBarMenuOpened
      window.addEventListener('click', () => {
        this.navBarMenuOpened = false;
      }, {
        once: true
      })
    },
    getPictureUrl(image) {
      return this.$options.filters.defaultImage(image?.formats);
    },

    startSlider() {
      const imageSize = this.$el.querySelectorAll('.Header__hero-slider__image-item').length;
      this.sliderIndex += 1;
      if (this.sliderIndex >= imageSize) {
        this.sliderIndex = 0;

      }
      this.$el.querySelectorAll('.Header__hero-slider__image-item').forEach((entry) => {
        entry.classList.remove('Header__hero-slider__image-item--active');
      })
      this.$el.querySelector(`.Header__hero-slider__image-item--${this.sliderIndex}`).classList.add('Header__hero-slider__image-item--active');
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

$navbar-height: 60px;
$navbar-height-small: 60px;
.Header {
  $self: &;
  position: relative;
  height: 600px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &--small-height {
    height: $navbar-height;
    background-color: rgba(96, 168, 239, 0.38) !important;
    background-image: none;

    #{$self}__hero-slider {
      display: none;
    }
  }

  &__hero-slider {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;

    &:before {
      content: " ";
      background-color: $td-black-30;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    &__title {
      position: absolute;
      z-index: 2;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: fit-content;
      height: fit-content;
      color: $td-yellow;
      text-shadow: 0 0 3px $td-blue;
      text-align: center;
    }

    &__image-item {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center;
      flex: 0 0 100%;
      opacity: 0;
      transition: opacity .5s ease-in-out;
      position: absolute;

      &--active {
        opacity: 1;
      }
    }
  }

  &__navbar {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 204px;
    width: 100%;
    height: 60px;
    z-index: 999;

    @media screen and (max-width: 992px) {
      padding: 0 25px;
    }

    &__logo {
      &__img {
        width: 70px;
        height: 70px;
      }
    }

    &__menu {
      display: flex;
      align-items: center;
      width: calc(50% - 50px);

      &__item {
        margin-right: 10px;
        text-transform: uppercase;
        color: $td-blue;
        overflow: hidden;
        transition: all .5s ease;
        visibility: hidden;
        opacity: 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        left: 0;
        top: 0;
        background-color: rgb(96 168 239 / 83%);
        padding-top: 100px;
        width: 300px;
        height: 100vh;
        text-align: center;
        transform: translateX(-100%);

        &--open {
          visibility: visible;
          opacity: 1;
          transform: translateX(0%);
        }

        a {
          color: white;
          padding: 13px 0;
          font-weight: bold;


          &:hover {
            background-color: $td-black-43;
            border-right: 5px solid $td-yellow;
            text-decoration: none;
          }
        }
      }

      &__btn {
        background-color: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        padding: 0;
        width: 50px;
        z-index: 9;

        .line {
          fill: none;
          stroke: black;
          stroke-width: 6;
          transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
          stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .line1 {
          stroke-dasharray: 60 207;
          stroke-width: 6;
        }

        .line2 {
          stroke-dasharray: 60 60;
          stroke-width: 6;
        }

        .line3 {
          stroke-dasharray: 60 207;
          stroke-width: 6;
        }

        &--opened {
          .line1 {
            stroke-dasharray: 90 207;
            stroke-dashoffset: -134;
            stroke-width: 6;
          }

          .line2 {
            stroke-dasharray: 1 60;
            stroke-dashoffset: -30;
            stroke-width: 6;
          }

          .line3 {
            stroke-dasharray: 90 207;
            stroke-dashoffset: -134;
            stroke-width: 6;
          }
        }
      }
    }

    &__lang {
      width: calc(50% - 50px);
      position: relative;

      &__selected {
        cursor: pointer;
        width: fit-content;
        float: right;
        color: $td-yellow;
        font-weight: 600;
        display: flex;
        gap: 10px;
        align-items: center;
      }

      &__img {
        width: 20px;
        height: 20px;
        cursor: pointer;
        border-radius: 5px;
      }

      &__list {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        width: auto;
        height: 132px;
        padding: 25px;
        background-color: rgb(0 0 0 / 20%);
        right: 0;
        top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-content: space-between;
        align-items: center;
        border-radius: 7px;

        &--opened {
          opacity: 1;
          visibility: visible;
        }

        a {
          color: white;
          font-weight: bold;

          &[disabled] {
            pointer-events: none;
            cursor: default;
          }
        }
      }
    }

    &__user {

      display: flex;
      flex-direction: row;
      margin-left: 10px;

      &__logout-btn {
        background-image: url("assets/images/logout-image.svg");
        width: 25px;
        height: 25px;
        margin: 0 4px;
        background-size: contain;
        cursor: pointer;
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
    }
  }
}

.td-transition {
  transition: all 0.25s ease;
}
</style>
