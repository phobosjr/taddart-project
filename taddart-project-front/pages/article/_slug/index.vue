<template>
  <v-container v-if="article">
    <v-card
      tile
    >
      <v-card-title class="font-weight-bolder text-uppercase mb-4">{{ article.title }}</v-card-title>
      <v-card-text class="text-justify w-75 m-auto" v-html="article.content"></v-card-text>
      <v-card-actions
        class="d-flex">

        <v-list-item class="grow">
          <v-row
            class="w-100"
          >
            <v-col
              class="d-inline-flex"
            md="2"
            >
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  alt=""
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Evan You</v-list-item-title>
              </v-list-item-content>
            </v-col>
            <v-col class="d-inline-flex"
            md="2">
              <v-icon class="mr-1">
                mdi-calendar-range
              </v-icon>
              <v-list-item-content>
                <v-list-item-title>{{ article.created_at | formatDate }}</v-list-item-title>
              </v-list-item-content>
            </v-col>

          </v-row>

          <v-row
            align="center"
            justify="end"
          >

          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import articleQuery from '@/apollo/queries/article/article.gql'

export default {
  name: "index",

  apollo: {
    articles: {
      prefetch: true,
      query: articleQuery,
      variables () {
        return { slug: this.$route.params.slug }
      }
    }
  },
  computed: {
    article () {
     return this.articles ? this.articles[0] : {}
    }
  }

}
</script>

<style scoped>

</style>
