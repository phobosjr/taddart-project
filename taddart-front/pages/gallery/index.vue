<template>
  <div class="Gallery container-fluid p-2">
    <separate-line :text-content="$t('gallery_title')"></separate-line>
    <div class="Gallery__panel">
      <div class="Gallery__panel__album" v-for="(album, index) in albums" :key="index">
        <div v-for="(image, index) in album.medias.slice(0,3)"
             :key="index"
             :style="{backgroundImage:buildThumbnailImage(image.formats, image.mime)}"
             class="Gallery__panel__album__image"
             @click="showMediaAlbum(album.id)"
        ></div>
        <div class="Gallery__panel__album__infos">
          <span>{{ album.album_title[$i18n.locale] }}</span>
          <div>
            <img src="~/assets/images/card-image.svg">
            <span>{{ album.medias.length }}</span>
          </div>
        </div>
      </div>
    </div>
    <CoolLightBox
      :items="mediaItems"
      :index="mediaIndex"
      :useZoomBar=true
      effect="swipe"
      @close="mediaIndex = null">
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
      mediaIndex: null,
      albumId: null
    }
  },
  computed: {
    mediaItems() {
      return this.getAlbumMedias()
        .map(item => this.buildMediaObject(item))
    }
  },
  apollo: {
    albums: {
      prefetch: true,
      query: albumsQuery,
    }
  },
  methods: {
    getAlbumMedias() {
      return this.albumId ?
        this.albums.find(album => album.id === this.albumId).medias :
        this.albums.flatMap(album => album.medias)
    },
    showMediaAlbum(albumId) {
      this.albumId = albumId;
      this.mediaIndex = 0;
    },
    buildMediaObject(mediaObject) {
      return {
        src: mediaObject.url,
        thumb: this.$options.filters.thumbnailImage(mediaObject.formats)
      };
    },
    buildThumbnailImage(formats, type) {
      return type.includes('video') ? 'url(' + require('~/assets/images/video-thumbnail.png') + ')' : 'url(' + this.$options.filters.thumbnailImage(formats) + ')';
    }
  }
}
</script>

<style lang="scss" scoped>
.Gallery {
  min-height: 100vh;

  &__panel {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;

    &__album {
      margin: 40px 20px 20px 20px;
      width: 350px;
      height: 220px;
      position: relative;

      &:hover {
        > * {
          &:first-child {
            margin-top: 0px;
          }

          &:nth-child(2) {
            margin-top: -10px;
            margin-left: 10px;
          }

          &:nth-child(3) {
            margin-top: -20px;
            margin-left: 20px;
          }
        }
      }

      &__image {
        position: absolute;
        cursor: pointer;
        width: 100%;
        min-height: 190px;
        background-position: center;
        background-size: cover;
        -webkit-box-shadow: 4px -1px 12px 0px rgba(0, 0, 0, 0.49);
        box-shadow: 4px -1px 12px 0px rgba(0, 0, 0, 0.49);
        transition: all .5s ease;

        &:first-child {
          z-index: 99;
        }

        &:nth-child(2) {
          z-index: 98;
        }

        &:nth-child(3) {
          z-index: 97;
        }
      }

      &__infos {
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding: 0 25px;
        font-size: 14px;

        img {
          width: 19px;
        }
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
