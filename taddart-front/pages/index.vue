<template>
<div class="d-flex p-5 justify-content-center">
  <v-card v-for="article in articles" :key="article.title" class="m-1">
    <v-card-title>
      {{ article.title }}
    </v-card-title>
    <v-card-actions>
      <nuxt-link :to="'article/'+article.slug" >
        <v-list-item-title>Γɣaṛ ugar</v-list-item-title>
      </nuxt-link>
    </v-card-actions>
  </v-card>

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
