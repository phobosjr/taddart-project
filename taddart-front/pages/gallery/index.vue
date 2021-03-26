<template>
  <div class="Gallery container-fluid p-2">
    <div class="Gallery__panel d-flex flex-wrap p-1 justify-content-center">
      <img v-for="(item, index) in pictureThumbnails"
           :key="index"
           :src="item"
           class="Gallery__panel__image"
           @click="pictureIndex = index">
    </div>
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
import galleryQuery from "@/apollo/queries/gallery/gallery.gql";

export default {
  name: "gellery",
  layout: 'layoutWithSmallHeader',
  data: () => {
    return {
      pictureIndex: null
    }
  },
  computed: {
    pictureItems() {
      return this.gallery
        .images
        .map(item => this.buildPictureItems(item.picture.formats, item.caption) )
    },
    pictureThumbnails() {
      return this.gallery
        .images
        .map(item => 'http://192.168.1.93:1337' + item.picture.formats.thumbnail.url)
    }
  },
  apollo: {
    gallery: {
      prefetch: true,
      query: galleryQuery
    }
  },
  methods: {
    getPictureUrl (formats) {
      return formats.medium ? formats.medium.url : formats.small.url;
    },
    buildPictureItems (formats, caption) {
      const item = {
        src: 'http://192.168.1.93:1337' + this.getPictureUrl(formats),
        title: caption?.title,
        description: caption?.description
      }
      return item;
    }
  }
}
</script>

<style lang="scss" scoped>
.Gallery {
  min-height: 100vh;

  &__panel {
    flex-wrap: wrap;
    &__image {
     cursor: pointer;
      &:hover{
        -ms-transform:scale(1.2);
        -webkit-transform:scale(1.2);
        transform:scale(1.2);
        -webkit-transition:all 0.4s cubic-bezier(.68,-0.55,.27,1.55);
        transition: all 0.4s cubic-bezier(.68,-0.55,.27,1.55);
      }
    }
  }
}
</style>
