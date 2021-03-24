<template>
<div>
  <v-list>
    <nuxt-link v-for="article in articles" link :to="'article/'+article.slug" :key="article.title">
      <v-list-item-title>{{ article.title }}</v-list-item-title>
    </nuxt-link>
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
