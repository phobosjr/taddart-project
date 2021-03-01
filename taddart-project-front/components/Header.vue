<template>
  <div>
    <nav
      class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top"
      :class="{ 'top-nav-collapse': isScrolled }"
    >
      <!-- Text Logo - Use this if you don't have a graphic logo -->
      <a class="navbar-brand logo-text page-scroll" href="index.html">Taddart</a>

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
        <span class="nav-item social-icons">
          <span class="fa-stack">
            <a href="#your-link">
              <span class="hexagon"></span>
              <i class="fab fa-facebook-f fa-stack-1x"></i>
            </a>
          </span>
          <span class="fa-stack">
            <a href="#your-link">
              <span class="hexagon"></span>
              <i class="fab fa-twitter fa-stack-1x"></i>
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
                  {{ bigTitle }}
                </h1>
                <p class="p-heading p-large" v-html="subTitle"></p>
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
export default {
  components: { menuItem},
  data: () => {
    return {
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
<style lang="">
</style>
