<template>
  <div class="Gallery container-fluid p-2">
    <div class="Gallery__tags d-flex flex-wrap justify-content-center m-4">
      <button :class="['Gallery__album-btn',{'active-tag': albumId === null}]"
              @click="albumId = null">
        {{ $t('all_albums_title') }}
      </button>
      <button  :class="['Gallery__album-btn',{'active-tag': albumId === album.id}]"
        v-for="(album, index) in albums"
               :key="index"
               @click="albumId = album.id"
      >
        {{ album.album_title[$i18n.locale] }}
      </button>
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
      return this.albumId ?
        this.albums.find(album => album.id === this.albumId).images :
        this.albums.flatMap(album => album.images)
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

  &__album-btn {
    padding: 3px 21px;
    border-radius: 16px;
    border: 1px solid #0000001f;
    &:hover {
      background-color: #0000001f;
    }
  }

  &__panel {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media screen and (max-width: 669px) {
      grid-template-columns: repeat(2, 210px);
    }

    @media screen and (max-width: 472px) {
      grid-template-columns: 210px;
    }

    &__image {
      cursor: pointer;
      width: 350px;
      background-color: #a5a4a4;
      background-position: center;
      background-size: cover;
      min-height: 200px;
      margin: 8px;
      &:hover {
        -webkit-box-shadow: 0 0 16px -2px #000000;
        box-shadow: 0 0 16px -2px #000000;
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
