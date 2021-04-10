<template>
  <div
    :class="['Article', 'p-5', 'd-flex']" v-if="article">
    <div class="Article__main p-0">
      <h1 class="Article__main__title font-weight-bolder text-uppercase mb-4">{{ article.title }}</h1>
      <div class="Article__main__profile text-left w-100">
        <span> {{ $t('article_author_label') }}<strong>{{ $t('admin_label') }}</strong></span>
        <span>{{ article.created_at | formatDate }}</span>
      </div>
      <div v-if="articleImageUrl" class="Article__main__image mb-4">
      <div :style="{backgroundImage: 'url('+$options.filters.defaultImage(articleImageUrl)+')'}">

      </div>
      </div>
      <div class="Article__main__content text-justify m-auto" v-html="article.content"></div>
    </div>
    <div class="Article__last-posts d-flex flex-column p-3">

      <h4>{{ $t('last_article_title') }}</h4>
      <div v-for="article in filteredLastArticles" :key="article.id" class="p-3">
        <div class="mb-3">
          <img class="w-100" :src="getFormatsFromImage(article.imageUrl) | thumbnailImage" alt="">
        </div>
        <div class="d-flex flex-column">
          <div class="Article__last-posts__date">{{ article.created_at | formatDate }}</div>
          <div class="Article__last-posts__title">{{ article.title }}</div>
          <a :href="article.slug" class="Article__last-posts__link mt-3">
            {{ $t('read_article_label') }}
          </a>
        </div>

      </div>

    </div>
  </div>
  <not-found-error v-else></not-found-error>
</template>

<script>
import articleQuery from '@/apollo/queries/article/article.gql'
import lastArticlesQuery from '@/apollo/queries/article/lastArticles.gql'

export default {
  name: "Article",
  apollo: {
    fetchedArticle: {
      prefetch: true,
      query: articleQuery,
      variables() {
        return {slug: this.$route.params.slug}
      }
    },
    lastArticles: {
      prefetch: true,
      query: lastArticlesQuery
    }
  },
  computed: {
    article() {
      return this.fetchedArticle ? this.fetchedArticle[0] : {}
    },
    articleImageUrl() {
      return this.article?.image?.formats
    },
    filteredLastArticles () {
      return this.lastArticles.filter(article => article.slug !== this.$route.params.slug);
    }
  },
  methods: {
    getFormatsFromImage(image) {
      return image?.formats;
    }
  }
}
</script>

<style lang="scss" scoped>
.Article {
  min-height: 100vh;
  position: relative;

  &__main {
    width: 85%;

    @media screen and (max-width: 1390px) {
      width: 100%;
    }

    &__title {
      text-align: center;
    }

    &__profile {
      display: flex;
      flex-direction: column;
      text-align: end;
      padding: 5px;
      max-width: 700px;
      height: auto;
      margin: auto;
    }

    &__image {
      max-width: 700px;
      min-height: 400px;
      margin: auto;
       div {
         width: 100%;
         min-height: 400px;
         background-size: cover;
       }
    }

    &__content {
    }
  }

  &__last-posts {
    width: 15%;
    @media screen and (max-width: 1390px) {
      display: none !important;
    }

    &__date {
      font-size: 13px;
      color: gray;
      margin-bottom: 4px;
    }
    &__title {
      font-weight: bold;
    }
    &__link {
      text-align: right;
    }
  }
}
</style>
