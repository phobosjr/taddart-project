<template>
  <div class="Header">
    <nav
      class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top"
      :class="{ 'top-nav-collapse': isScrolled }"
    >
      <!-- Text Logo - Use this if you don't have a graphic logo -->
      <a class="navbar-brand logo-text page-scroll" href="index.html">{{ header.logo_title }}</a>

      <!-- Image Logo -->
      <!--<a class="navbar-brand logo-image" href="index.html"
        ><img src="images/logo.svg" alt="alternative"
      /></a>-->

      <!-- Mobile Menu Toggle Button -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-awesome fas fa-bars"></span>
        <span class="navbar-toggler-awesome fas fa-times"></span>
      </button>
      <!-- end of mobile menu toggle button -->

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav ml-auto">
          <menu-item menu-label="INTRO" menu-link="#"></menu-item>
          <menu-item menu-label="SERVICES" menu-link="#"></menu-item>
        </ul>
        <span class="lang nav-item social-icons">
          <span class="fa-stack" v-if="lang === 'fr'">
            <a @click="lang = 'kb'">
              <span class="lang_kb"></span>
            </a>
          </span>
          <span class="fa-stack" v-if="lang === 'kb'">
            <a @click="lang = 'fr'">
              <span class="lang_fr "></span>
            </a>
          </span>
        </span>
      </div>
    </nav>
    <header id="header" class="header">
      <div class="header-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-container">
                <h1>
                  {{ header.big_title[lang] }}
                </h1>
                <p class="p-heading p-large" v-html="header.sub_title[lang]"></p>
                <a class="btn-solid-lg page-scroll" href="#intro">Découvrir</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import menuItem from "~/components/menu-item/MenuItem";
import headerQuery from '@/apollo/queries.header/header.gql'
export default {
  components: { menuItem},
  async fetch (){
    this.header = await this.$strapi.find('header');
    console.log(this.header);

  },
  data: () => {
    return {
      header: {},
      lang: 'kb',
      isScrolled: false,
      bigTitle: "Taddart-iw",
      subTitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in urna ultricies, aliquam tortor eu, volutpat nibh. In facilisis, velit eget fermentum lobortis, lorem tellus pretium mauris, sed porttitor nulla odio eu ligula. Aenean metus arcu, suscipit a luctus et, volutpat eu est. Vivamus mi ex, malesuada eu tincidunt eget, placerat vitae ex. Suspendisse efficitur non lectus eget accumsan. Etiam sit amet erat at eros efficitur tempus. Nunc maximus porta eros eu placerat. Sed semper sagittis ex eu viverra. Maecenas consequat, sapien ut tincidunt fringilla, purus orci placerat urna, eget iaculis erat dolor et tortor.",
    };
  },

  methods: {
    handleScroll() {
      window.scrollY === 0
        ? (this.isScrolled = false)
        : (this.isScrolled = true);
    },
  },
  // apollo: {
  //   header: {
  //     prefetch: true,
  //     query: headerQuery
  //   }
  // },
  created() {
    if (process.client) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
};
</script>
<style lang="scss" scoped>

.Header {

  .lang {
    .lang_kb {
      background-image: url("./assets/images/header/kb-lang-32x32.png");
      width: 20px;
      height: 20px;
      position: absolute;
      background-position: 0px 0px;
      background-size: 100% 100%;
    }

    .lang_fr {
      background-image: url("./assets/images/header/fr-lang.svg");
      width: 20px;
      height: 20px;
      position: absolute;
      background-position: 0px 0px;
      background-size: 100% 100%;
    }
  }
}


</style>
