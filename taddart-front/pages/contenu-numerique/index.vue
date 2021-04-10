<template>
  <div class="Contentu-numerique container-fluid p-2">
  <div v-for="fileUrl in contentNumerics[0].files">
    {{fileUrl}}
  </div>
  </div>
</template>

<script>

import contentQuery from '@/apollo/queries/contenu-numerique/contenu.gql';

export default {
  name: "gellery",
  layout: 'layoutWithSmallHeader',
  components: {
    pdf
  },
  apollo: {
    contentNumerics: {
      prefetch: true,
      query: contentQuery,
      result(res) {
        console.log(res);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Contentu-numerique {
  min-height: 100vh;
}
</style>
