<template>
  <div class="Map p-5">
    <h1 class="Map__title">{{ $t('map_title') }}</h1>
    <svg class="Map__svg">
      <image xlink:href="~/assets/images/map.svg" class="Map__svg__image"></image>
      <polygon points="732,315,943,351,868,504,725,460,707,408" v-tooltip="'Ait Graich'"
               class="Map__svg__polygon"></polygon>
      <polygon points="864,505,808,659,495,658,491,450,677,336,724,460" v-tooltip="'Tassoukit'"
               class="Map__svg__polygon"></polygon>
      <polygon points="705,396,672,312,498,237,519,92,648,81,853,92,821,327,728,314,711,372" v-tooltip="'Taddart oufella'"
               class="Map__svg__polygon"></polygon>
      <polygon points="824,326,852,95,1155,105,1108,325,945,353" v-tooltip="'Tighilt umezzir'"
               class="Map__svg__polygon"></polygon>
      <polygon points="496,238,354,287,491,449,678,336,667,312" v-tooltip="'Igherbiyen'"
               class="Map__svg__polygon"></polygon>
    </svg>
  </div>
</template>

<script>
export default {
  name: "index",
  layout: 'layoutWithSmallHeader',
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
