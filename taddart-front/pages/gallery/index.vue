<template>
  <div class="Gallery">
    <separate-line :text-content="$t('gallery_title')"></separate-line>
    <div class="Gallery__panel">
      <div class="Gallery__panel__album" v-for="(album, index) in albums" :key="index">
        <div v-for="(thumbnailImage, index) in getThumbnailImages(album)"
             :key="index"
             :style="{backgroundImage:thumbnailImage}"
             class="Gallery__panel__album__image"
             @click="showMediaAlbum(album.id, album.nbView)"
        ></div>
        <div class="Gallery__panel__album__title"
             @click="showMediaAlbum(album.id, album.nbView)">
          <span>{{ album.title }}</span>
        </div>
        <div class="Gallery__panel__album__infos">
          <div>
            <img src="~/assets/images/card-image.svg">
            <span>{{ computeNumberOfItemMedia(album) }}</span>
          </div>
          <div>
            <img src="~/assets/images/eye-image.svg">
            <span>{{ album.nbView | numberViewFormat }}</span>
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
      const embedMedia = this.getEmbedMedias()
        .map(item => this.buildEmbedMediaObject(item));

      const albumMedia = this.getAlbumMedias()
        .map(item => this.buildMediaObject(item));
      return [...albumMedia, ...embedMedia]
    }
  },
  apollo: {
    albums: {
      prefetch: true,
      query: albumsQuery,
      variables() {
        return {locale: this.$i18n.locale}
      }
    }
  },
  methods: {
    getAlbumMedias() {
      return this.albumId ?
        this.albums.find(album => album.id === this.albumId).medias :
        []
    },
    getEmbedMedias() {
      return this.albumId ?
        this.albums.find(album => album.id === this.albumId).youtubeUrls :
        []
    },
    showMediaAlbum(albumId, nbView) {
      this.albumId = albumId;
      this.mediaIndex = 0;
      const viewedAlbums = this.$cookies.get('viewedAlbums');
      if (!viewedAlbums || !viewedAlbums.includes(albumId)) {
        this.$axios.$put(`${this.$config.clientSide.strapiBackendUrl}/albums/${albumId}`, {
          nbView: nbView + 1
        }).then((result) => {
          this.albums.find(album => album.id === albumId).nbView = result.nbView;
          let newViewedAlbums = [];
          newViewedAlbums.push(albumId);
          newViewedAlbums.push(viewedAlbums);
          this.$cookies.set('viewedAlbums', newViewedAlbums);
        })
      }
    },
    buildMediaObject(mediaObject) {
      return {
        src: mediaObject.url,
        thumb: this.$options.filters.thumbnailImage(mediaObject.formats)
      };
    },
    buildThumbnailImage(formats, type) {
      return type.includes('video') ?
        'url(' + require('~/assets/images/video-thumbnail.png') + ')' :
        'url(' + this.$options.filters.defaultImage(formats) + ')';
    },
    buildEmbedMediaObject(mediaObject) {
      const parsedMediaObject = JSON.parse(mediaObject.oembed);
      return {
        title: parsedMediaObject.title,
        src: parsedMediaObject.url,
        thumb: parsedMediaObject.thumbnail
      };
    },
    getThumbnailImages(album) {
      if (album?.medias && album?.medias.length > 0) {
        return album.medias.slice(0, 3)
          .map(image => this.buildThumbnailImage(image.formats, image.mime))
      } else {
        return album.youtubeUrls.slice(0, 3)
          .map(embedObject => {
            const parsed = JSON.parse(embedObject.oembed);
            return 'url(' + parsed.thumbnail + ')';
          })
      }
    },
    computeNumberOfItemMedia(album) {
      return album?.medias.length + album?.youtubeUrls.length
    }
  }
}
</script>

<style lang="scss" scoped>
.Gallery {
  min-height: 100vh;

  &__panel {
    position: relative;
    display: grid;
    width: 75%;
    margin: auto;
    padding: 10px 0;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;

    @media screen and (max-width: 992px) {
      grid-template-columns: 1fr;
      width: 95%;
    }

    &__album {
      width: 350px;
      height: 350px;
      position: relative;
      width: 100%;

      &:first-child {
        height: 730px;
        width: 100%;
        grid-row: span 2;
        grid-column: span 1;

        @media screen and (max-width: 992px) {
          grid-row: span 1;
          grid-column: span 1;
          height: 350px;
        }
      }

      &:hover & {
        &__image {
          &:nth-child(2) {
            margin-top: -10px;
            margin-left: 10px;
            -webkit-box-shadow: 4px -1px 12px 0px rgba(0, 0, 0, 0.49);
            box-shadow: 4px -1px 12px 0px rgba(0, 0, 0, 0.49);
          }

          &:nth-child(3) {
            margin-top: -20px;
            margin-left: 20px;
            -webkit-box-shadow: 4px -1px 12px 0px rgba(0, 0, 0, 0.49);
            box-shadow: 4px -1px 12px 0px rgba(0, 0, 0, 0.49);
          }
        }
      }

      &__title {
        position: absolute;
        z-index: 99;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 25px;
        text-transform: uppercase;
        font-weight: bolder;
        cursor: pointer;
        color: white;

        > span {
          height: fit-content;
          width: fit-content;
          position: absolute;
          margin: auto;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        &:before {
          content: ' ';
          position: absolute;
          top: 0;
          margin: auto;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background-color: $td-black-30;
        }

      }

      &__image {
        position: absolute;
        cursor: pointer;
        width: 100%;
        min-height: 100%;
        background-position: center;
        background-size: cover;
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
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        padding: 0 25px;
        font-size: 20px;
        color: white;
        z-index: 999;
        font-weight: 600;

        height: 75px;

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
