<template>
  <div class="Gallery container-fluid p-2">
    <div class="Gallery__tags d-flex flex-wrap justify-content-center m-4">
      <v-btn
        depressed
        elevation="2"
        outlined
        raised
        rounded
        small
        text
        :class="{'active-tag': albumId === null}"
        @click="albumId = null"
      > {{ $t('all_albums_title') }}
      </v-btn>
      <v-btn
        v-for="(album, index) in albums"
        :key="index"
        depressed
        elevation="2"
        outlined
        raised
        rounded
        small
        text
        :class="{'active-tag': albumId === album.id}"
        @click="albumId = album.id"
      > {{ album.album_title[$i18n.locale] }}
      </v-btn>
    </div>


    <transition-group name="fade" mode="out-in" tag="div" class="Gallery__panel p-1 justify-content-center">

      <div v-for="(item, index) in pictureThumbnails"
           :key="item"
           :style="{backgroundImage: 'url('+item+')'}"
           class="Gallery__panel__image"
           @click="pictureIndex = index"
      ></div>
    </transition-group>

    <CoolLightBox
      :items="pictureItems"
      :index="pictureIndex"
      :useZoomBar=true
      effect="swipe"
      @close="pictureIndex = null">
    </CoolLightBox>
  </div>
</template>

<script>
import albumsQuery from "@/apollo/queries/gallery/albums.gql";

export default {
  name: "gellery",
  layout: 'layoutWithSmallHeader',
  data: () => {
    return {
      pictureIndex: null,
      albumId: null
    }
  },
  computed: {
    pictureItems() {
      return this.getAlbumPictures()
        .map(item => this.$options.filters.defaultImage(item.formats))
    },
    pictureThumbnails() {
      return this.getAlbumPictures()
        .map(item => this.$options.filters.thumbnailImage(item.formats))
    }
  },
  apollo: {
    albums: {
      prefetch: true,
      query: albumsQuery,
    }
  },
  methods: {
    getAlbumPictures() {
      return this.albumId ? this.albums[this.albumId - 1].images : this.albums
        .flatMap(album => album.images)
    }
  }
}
</script>

<style lang="scss" scoped>
.Gallery {
  min-height: 100vh;

  &__tags {
    button {
      margin: 2px;
    }
  }

  &__panel {
    display: grid;
    grid-template-columns: repeat(3, 210px);
    grid-column-gap: 46px;
    grid-row-gap: 4px;
    overflow: hidden;
    position: relative;

    @media screen and (max-width: 669px) {
      grid-template-columns: repeat(2, 210px);
    }

    @media screen and (max-width: 472px) {
      grid-template-columns: 210px;
    }

    &__image {
      cursor: pointer;
      width: 250px;
      background-color: #a5a4a4;
      background-position: center;
      background-size: cover;
      min-height: 200px;

      &:hover {
        -ms-transform: scale(1.2);
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
        -webkit-transition: all 0.8s cubic-bezier(.68, -0.55, .27, 1.55);
        transition: all 0.8s cubic-bezier(.68, -0.55, .27, 1.55);
      }
    }
  }

  .active-tag {
    background-color: #1867c0;
    color: white;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s ease-out;
  }
  .fade-enter {
    opacity: 0;
    transform: translateX(120px);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateX(-120px);
  }
  .fade-enter-active {
    transition-delay: .5s;
  }

}
</style>
