<template>
  <div :class="['Header', {'scrolled': isScrolled}, 'td-transition', {'small-height': smallHeader}]"
       :style="{backgroundImage: 'url(http://localhost:1337'+header.background_image[0].url+')'}">
    <nav class="Header__navbar navbar navbar-light position-fixed td-transition">
      <nuxt-link class="Header__navbar__logo navbar-brand" to="/">
        <img :src="'http://localhost:1337'+header.logo_image.url" width="30" height="30"
             class="Header__navbar__logo__img d-inline-block align-top td-transition" alt="">
      </nuxt-link>

      <div class="Header__navbar__lang">
        <span>
          <img :class="['Header__navbar__lang__img', {'Header__navbar__lang__img_current': locale === 'kb'}]"
               src="~/assets/images/header/kb-lang-32-32.png" alt="KB"
          @click="switchLocale('kb')">
        </span>
        <span>
          <img :class="['Header__navbar__lang__img', {'Header__navbar__lang__img_current': locale === 'fr'}]"
               src="~/assets/images/header/fr-lang.svg" alt="FR"
               @click="switchLocale('fr')">
        </span>
      </div>
    </nav>
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
    switchLocale (lang) {
      this.$store.dispatch('switchLocale', lang);
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
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

  .Header__navbar {
    height: 120px;
    padding: 0 204px;
    background-color: rgba(96, 168, 239, 0.38) !important;
    width: 100%;

    .Header__navbar__logo {
      .Header__navbar__logo__img {
        width: 100px;
        height: 100px;
      }
    }

    .Header__navbar__lang {
      .Header__navbar__lang__img {
        width: 20px;
        height: 20px;
        cursor: pointer;
        opacity: .25;

        &.Header__navbar__lang__img_current {
          opacity: 1;
          cursor: default;
        }
      }
    }
  }
}

.td-transition {
  transition: all 0.25s cubic-bezier(.6, .04, .98, .34);
}

.small-height {
  height: 16em;
}


</style>
