<template>
  <section v-if="lastAlbum" class="LastAlbum">
    <client-only>
      <agile :dots="true" :infinite="false" :autoplay-speed="5000">
        <img v-for="image in images" :src="image" class="slide agile__image">
        <template slot="prevButton">
          <img src="~/assets/images/chevron-left-image.svg">
        </template>
        <template slot="nextButton">
          <img src="~/assets/images/chevron-right-image.svg">
        </template>
      </agile>
    </client-only>
    <div class="LastAlbum__gallery-panel">
      <div class="LastAlbum__gallery-panel__link">
        <a :href="localePath('/gallery', $i18n.locale)">
          {{ $t('gallery_title') }}
        </a>
        <img src="~/assets/images/arrow-right-image.svg">
      </div>
    </div>

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

      img {
        width: 35px;
      }
    }

    &__dots {
      bottom: 10px;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
    }
    &__dot {
      margin: 0 10px;
      button {
        background-color: transparent;
        border: 1px solid #fff;
        border-radius: 50%;
        cursor: pointer;
        display: block;
        height: 10px;
        font-size: 0;
        line-height: 0;
        margin: 0;
        padding: 0;
        transition-duration: .3s;
        width: 10px;
      }

      &--current,
      &:hover
      button {
        background-color: $td-yellow;
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

  &__gallery-panel {
    width: 100%;
    height: 110px;
    font-size: 25px;
    background-color: $td-yellow;
    text-align: center;
    padding: 30px 0;
    background-position: top;
    background-attachment: fixed;

    &__link {

      &:hover {
        img {
          transform: translateX(10px);
        }
      }

      img {
        transition: all 0.5s ease;
        width: 25px;
      }

      a {
        color: white;
        text-transform: uppercase;
        font-weight: bolder;
        text-decoration: none;
      }
    }
  }

}
</style>
