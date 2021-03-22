<template>
  <v-container
    class="Article" v-if="article">
    <div>
      <h1  class="font-weight-bolder text-uppercase mb-4">{{ article.title }}</h1>
      <div
        class="info-tags w-100">
        <div>
          <v-icon
          color="5F9EA0"
          size="45"
          >
            mdi-account-circle
          </v-icon>
        </div>

        <div class="grow">
          <v-row
            class="w-100 justify-content-end d-flex flex-column"
          >
            <div class="tag d-inline-flex">
              <span>By :</span>
              <span>
                <strong>Evan You</strong>
              </span>
            </div>
            <div class="tag d-inline-flex">
                <span>{{ article.created_at | formatDate }}</span>
            </div>

          </v-row>
        </div>
      </div>
      <div class="text-justify w-75" v-html="article.content"></div>
    </div>
  </v-container>
  <not-found-error v-else ></not-found-error>
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

<style lang="scss" scoped>
.Article {
  div {
    box-shadow: none !important;

    .info-tags {
      display: grid;
      grid-template-columns: 1fr 6fr 11fr;

      padding: 5px;
      margin-bottom: 15px;

      .tag {
        margin: 5px;
      }
    }
  }
}


</style>
