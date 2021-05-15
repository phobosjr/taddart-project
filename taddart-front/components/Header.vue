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
        <button :class="['Header__navbar__menu__btn']"
                aria-expanded="true" aria-label="Main Menu" @click="openNavBarMenu($event)">
          <td-menu :active="navBarMenuOpened"></td-menu>
        </button>
      </div>
      <a class="Header__navbar__logo" href="/">
        <img :src="header.logo_image.formats | defaultImage"
             class="Header__navbar__logo__img"
             alt="">
      </a>
      <div class="Header__navbar__right-menu">
        <div class="Header__navbar__right-menu__selected" v-if="$i18n.locale === 'kab'" @click="openRightMenu($event)">
          <span v-if="!username">{{ $t('lang_kab_label') }}</span>
          <img :class="['Header__navbar__right-menu__img']"
               src="~/assets/images/header/kb-lang-32-32.png" alt="KAB">
        </div>
        <div class="Header__navbar__right-menu__selected" v-if=" $i18n.locale === 'fr'" @click="openRightMenu($event)">
          <span v-if="!username">{{ $t('lang_fr_label') }}</span>
          <img :class="['Header__navbar__right-menu__img']"
               src="~/assets/images/header/fr-lang.svg" alt="FR">
        </div>
        <div class="Header__navbar__right-menu__logout-btn" @click="openRightMenu($event)">{{ username }}</div>

        <div
          :class="['Header__navbar__right-menu__list', 'td-transition', {'Header__navbar__right-menu__list--opened': langListOpened}]">
          <a v-if="$i18n.locale === 'fr'" :href="switchLocalePath('kab')" class="item">
            {{ $t('lang_kab_label') }}
            <img :class="['Header__navbar__right-menu__img']"
                 src="~/assets/images/header/kb-lang-32-32.png" alt="KAB">
          </a>
          <a v-if="$i18n.locale === 'kab'" :href="switchLocalePath('fr')" class="item">
            {{ $t('lang_fr_label') }}
            <img :class="['Header__navbar__right-menu__img']"
                 src="~/assets/images/header/fr-lang.svg" alt="FR">
          </a>
          <ul class="Header__navbar__right-menu__list__user" v-if="username">
            <li class="item">
              <div @click="logout()">{{ $t('logout_label') }}</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="Header__hero-slider" @click.stop="startSlider()">
      <div class="Header__hero-slider__title">
        <h1>{{ $t('big_title') }}</h1>
      </div>
      <div class="Header__hero-slider__socialMedia">
        <a :href="header.social_fb_link">
          <img class="Header__hero-slider__socialMedia__image" src="~/assets/images/facebook-logo-image.png">
          {{ header.social_fb_label }}
        </a>

        <a href="mailTo:contact@tuddar-nat-abdelmumen.net">
          <img class="Header__hero-slider__socialMedia__image" src="~/assets/images/envelope-image.svg">
          contact@tuddar-nat-abdelmumen.net
        </a>
      </div>
      <div v-for="(image, index) in sliderImages" :key="index"
           :class="['Header__hero-slider__image-item', `Header__hero-slider__image-item--${index}`, {'Header__hero-slider__image-item--active': index === 0} ]"
           :style="{backgroundImage: 'url('+getPictureUrl(image)+')'}"></div>
    </div>
  </div>
</template>
<script>
import headerQuery from '@/apollo/queries/header/header.gql'
import tdMenu from '@/components/icons/td-menu'
import {mapGetters} from 'vuex'

export default {
  props: {
    smallHeader: {type: Boolean, required: false, default: false}
  },
  components: {
    tdMenu
  },
  data: () => {
    return {
      isScrolled: false,
      navBarMenuOpened: false,
      navHeight: 120,
      langListOpened: false,
      userMenuListOpened: false,
      sliderIndex: 0,
      sliderTimeoutMs: 30000
    }
  },
  computed: {
    ...mapGetters({
      locale: 'locale',
      user: 'user/userData'
    }),
    username() {
      return this.user?.username;
    },
    sliderImages() {
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
      this.$store.dispatch('user/logout');
    },
    openRightMenu($event) {
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

    &__title {
      position: absolute;
      z-index: 2;
      margin: auto;
      top: 60px;
      left: 0;
      right: 0;
      width: 100%;
      height: fit-content;
      color: $td-blue-dark;
      text-transform: uppercase;
      text-shadow: 0 0 3px $td-blue;
      text-align: center;
      background-color: $td-white-15;
    }

    &__socialMedia {
      position: absolute;
      z-index: 1;
      bottom: 25px;
      left: 10px;
      width: fit-content;
      display: flex;
      flex-direction: row;
      gap: 10px;

      @media screen and (max-width: 992px){
        flex-direction: column;
      }

      a {
        color: white;
        display: flex;
        font-weight: bold;
        align-items: center;
        gap: 10px;
      }

      &__image {
        width: 35px;
        height: 35px;
      }
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
      @media screen and (max-width: 992px){
        display: none;
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
          border-right: 5px solid transparent;


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
      }
    }

    &__right-menu {
      width: calc(50% - 50px);
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      gap: 10px;

      &__selected {
        cursor: pointer;
        width: fit-content;
        color: $td-blue-dark;
        font-weight: 600;
        display: flex;
        gap: 5px;
        align-items: center;

        &:after {
          display: inline-block;
          width: 0;
          height: 0;
          vertical-align: .255em;
          content: "";
          border-top: .3em solid;
          border-right: .3em solid transparent;
          border-bottom: 0;
          border-left: .3em solid transparent;
        }
      }

      &__logout-btn {
        cursor: pointer;
        color: $td-blue-dark;
        width: max-content;
        display: flex;
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
        height: auto;
        padding: 15px 0;
        background-color: $td-black-43;
        right: 0;
        top: 30px;
        border-radius: 7px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;

        &--opened {
          opacity: 1;
          visibility: visible;
        }

        a {
          color: white;
          font-weight: bold;
          display: flex;
          gap: 10px;
        }

        &__user {
          color: white;
          list-style: none;

          li {
            cursor: pointer;
          }
        }

        .item {
          padding: 8px 30px;
          height: 35px;
          border-right: 4px solid transparent;
          &:hover {
            background-color: $td-black-43;
            border-right: 4px solid $td-yellow;
          }
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
    }
  }
}

.td-transition {
  transition: all 0.25s ease;
}
</style>
