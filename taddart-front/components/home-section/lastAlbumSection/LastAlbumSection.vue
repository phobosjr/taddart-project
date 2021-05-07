<template>
  <section v-if="lastAlbum" class="LastAlbum">
    <client-only>
      <agile :dots="false" :infinite="false" :autoplay-speed="5000">
        <img v-for="image in images" :src="image" class="slide agile__image">
        <template slot="prevButton">
          <img src="~/assets/images/chevron-left-image.svg">
        </template>
        <template slot="nextButton">
          <img src="~/assets/images/chevron-right-image.svg">
        </template>
      </agile>
    </client-only>

  </section>

</template>

<script>
import lastAlbumsQuery from "@/apollo/queries/gallery/lastAlbums.gql";

export default {
  name: "LastAlbumSection",
  apollo: {
    lastAlbum: {
      prefetch: true,
      query: lastAlbumsQuery,
      variables() {
        return {limit: 1}
      }
    }
  },
  computed: {
    images() {
      return this.lastAlbum[0]?.images.map(image => image.url);
    }
  }
}
</script>

<style lang="scss">
.LastAlbum {
  height: 100%;
  position: relative;

  .agile {
    &__nav-button {
      background: transparent;
      border: none;
      color: #fff;
      cursor: pointer;
      font-size: 24px;
      height: 100%;
      position: absolute;
      top: 0;
      transition-duration: .3s;
      width: 80px;

      &[disabled] {
        display: none;
      }

      &:hover {
        background-color: rgba(#000, .5);
        opacity: 1;
      }

      &--prev {
        left: 0;
      }

      &--next {
        right: 0;
      }
    }

    &--current,
    &:hover {
      button {
        background-color: $td-black-43;
      }
    }
    &__image {
      display: block;
      height: 500px;
      object-fit: contain;
      width: 100%;
    }
    &__slides {
      padding: 25px 0;
    }
    &__list {
      background-color: $td-black-80;
    }
  }

}
</style>
