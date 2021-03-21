<template>
<div>
  <v-list>
    <v-list-item v-for="article in articles" link :href="'/article/' + article.slug" :key="article.title">
      <v-list-item-title>{{ article.title }}</v-list-item-title>
    </v-list-item>
  </v-list>

</div>

</template>

<script>
import articlesQuery from '@/apollo/queries/articles/articles.gql'

export default {
    name: "index",
    apollo: {
      articles: {
        prefetch: true,
        query: articlesQuery,
      }
    }
}
</script>
