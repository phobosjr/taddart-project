<template>
  <div class="Gallery container-fluid p-2">
    <separate-line :text-content="$t('gallery_title')"></separate-line>
    <div class="Gallery__panel">
      <div class="Gallery__panel__album" v-for="(album, index) in albums" :key="index">
        <div v-for="(thumbnailImage, index) in getThumbnailImages(album)"
             :key="index"
             :style="{backgroundImage:thumbnailImage}"
             class="Gallery__panel__album__image"
             @click="showMediaAlbum(album.id, album.nbView)"
        ></div>
        <div class="Gallery__panel__album__infos">
          <span>{{ album.title }}</span>
          <div>
            <img src="~/assets/images/card-image.svg">
            <span>{{ computeNumberOfItemMedia(album) }}</span>
          </div>
          <div>
            <img src="~/assets/images/eye-image.svg">
            <span>{{ album.nbView }}</span>
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
        this.$strapi.update('albums', albumId, {
          nbView: nbView + 1
        }).then((result) => {
          this.albums.find(album => album.id === albumId).nbView = result.nbView;
          let newViewedAlbums = [];
          newViewedAlbums.push(albumId);
          newViewedAlbums.push(viewedAlbums);
          console.log(newViewedAlbums);
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
        'url(' + this.$options.filters.thumbnailImage(formats) + ')';
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
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

    &__album {
      margin: 40px 20px 20px 20px;
      width: 350px;
      height: 190px;
      position: relative;

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
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 25px;
        font-size: 14px;
        color: white;
        z-index: 999;
        font-weight: 600;
        background: rgb(0, 0, 0);
        background: linear-gradient(0deg, rgb(0 0 0 / 28%) 44%, rgb(0 0 0 / 28%) 66%, rgb(0 0 0 / 18%) 81%, #00000000 100%);
        height: 25px;

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
