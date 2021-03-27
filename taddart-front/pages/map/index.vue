<template>
  <div class="Map p-5">
    <h1 class="Map__title">{{ map.title[locale] }}</h1>
    <svg class="Map__svg">
      <image xlink:href="~/assets/images/map.svg" class="Map__svg__image"></image>
      <polygon points="732,315,943,351,868,504,725,460,707,408" v-tooltip="'Ait Graich'"
               class="Map__svg__polygon"></polygon>
      <polygon points="864,505,808,659,495,658,491,450,677,336,724,460" v-tooltip="'Tassoukit'"
               class="Map__svg__polygon"></polygon>
    </svg>
  </div>
</template>

<script>
import mapQuery from "@/apollo/queries/map/map.gql";
import {mapGetters} from "vuex";

export default {
  name: "index",
  layout: 'layoutWithSmallHeader',
  computed: {
    ...mapGetters({
      locale: 'locale'
    })
  },
  apollo: {
    map: {
      prefetch: true,
      query: mapQuery
    }
  },
}
</script>

<style lang="scss" scoped>
.Map {
  height: 100vh;

  &__svg {
    width: 100%;
    height: 100%;

    &__polygon {
      fill: #7b7e858c;
      transition: fill .2s ease-in-out;

      &:hover {
        fill: rgba(123, 126, 133, 0.77)
      }
    }
  }
}
</style>
