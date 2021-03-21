<template>
  <v-container v-if="article">
    <div class="post-title">
      <v-banner
        elevation="3"
        icon="mdi-note-edit-out-line"
        single-line
      >{{ article.title }}</v-banner>
    </div>
    <div>
      <v-container tag="p" v-html="article.content">
      </v-container>
    </div>
    <div class="d-flex flex-row-reverse">
      <v-banner
        elevation="3"
        icon="mdi-account"
      >
        David luiz
      </v-banner>
      <v-banner
      icon="mdi-calendar-range ">
        {{ article.created_at | formatDate }}
      </v-banner>
      <span></span>
    </div>

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
