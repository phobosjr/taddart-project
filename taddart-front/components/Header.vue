<template>
  <div :class="['Header', {'scrolled': isScrolled}, 'td-transition', {'small-height': smallHeader}]"
       :style="{backgroundImage: 'url(http://localhost:1337'+header.background_image[0].url+')'}">
    <nav class="Header__navbar navbar navbar-light position-fixed td-transition">
      <nuxt-link class="Header__navbar__logo navbar-brand" to="/">
        <img :src="'http://localhost:1337'+header.logo_image.url" width="30" height="30" class="d-inline-block align-top td-transition" alt="">
      </nuxt-link>
    </nav>

  </div>
</template>
<script>
import headerQuery from '@/apollo/queries/header/header.gql'
export default {
props: {
  smallHeader: {type: Boolean, required: false, default: false}
},

  data: ()=>{
    return {
      isScrolled: false
    }
},
  apollo: {
    header: {
      prefetch:true,
      query: headerQuery
    }
  },
  methods: {
    handleScroll() {
      window.scrollY === 0
        ? (this.isScrolled = false)
        : (this.isScrolled = true);
    },
  },
  beforeMount () {
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

    nav {
      height: 60px;
      background-color: rgba(96, 168, 239, 0.85) !important;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }

  nav {
    height: 120px;
    padding: 0 204px;
    background-color: rgba(96, 168, 239, 0.38) !important;
    width: 100%;

    img {
      width: 100px;
      height: 100px;
    }
  }
}
.td-transition {
  transition: all 0.25s cubic-bezier(.6,.04,.98,.34);
}

.small-height {
  height: 16em;
}


</style>
