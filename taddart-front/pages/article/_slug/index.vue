<template>
  <div
    :class="['Article']" v-if="article">
    <div class="Article__header" :style="{backgroundImage: 'url('+$options.filters.defaultImage(articleImageUrl)+')'}">
      <div class="td-overlay"></div>
      <div class="Article__header__title">
        <h1 class=" font-weight-bolder text-uppercase mb-4">{{ article.title }}</h1>
      </div>
      <div class="Article__header__profile text-left w-100">
        <span> {{ $t('article_author_label') }}<strong>{{ article.author }}</strong></span>
        <span>{{ article.created_at | formatDate }}</span>
      </div>
    </div>
    <div class="Article__main">
      <div class="Article__main__content">
        <div class="Article__main__content__breadcrumb">
          <a href="/">{{$t('home_title')}}</a>
          /
          <span>{{article.title}}</span>
        </div>
        <div class="Article__main__content__text" v-html="article.content"></div>
        <article-comment v-if="article.enableComments" :article-id="article.id"></article-comment>
        <article-comments v-if="article.enableComments" :article-id="article.id"></article-comments>
      </div>
      <div class="Article__main__last-posts d-flex flex-column p-3">
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
  </div>
  <not-found-error v-else></not-found-error>
</template>

<script>
import articleQuery from '@/apollo/queries/article/article.gql'
import lastArticlesQuery from '@/apollo/queries/article/lastArticles.gql'
import ArticleComments from "@/components/article-comments/article-comments";

export default {
  name: "Article",
  components: {ArticleComments},
  layout: 'layoutWithSmallHeader',
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
      query: lastArticlesQuery,
      variables() {
        return {limit: 3}
      }
    }
  },
  computed: {
    article() {
      return this.fetchedArticle ? this.fetchedArticle[0] : {}
    },
    articleImageUrl() {
      return this.article?.image?.formats
    },
    filteredLastArticles() {
      return this.lastArticles?.filter(article => article.slug !== this.$route.params.slug);
    }
  },
  methods: {
    getFormatsFromImage(image) {
      return image?.formats;
    }
  }
}
</script>

<style lang="scss">
.Article {
  min-height: 100vh;
  position: relative;

  &__header {
    display: block;
    width: 100%;
    height: 500px;
    background-size: cover;
    background-position: center;
    position: relative;
    vertical-align: center;

    &__title {
      color: white;
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: fit-content;
      height: 50px;
    }

    &__profile {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: row;
      padding: 12px;
      max-width: fit-content;
      color: white;

      > * {
        margin: 0 10px;
        font-weight: bold;
      }
    }
  }

  &__main {
    width: 100%;
    padding: 25px 0 0 0;
    margin-bottom: 25px;
    display: flex;
    justify-content: space-evenly;
    @media screen and (max-width: 1390px) {
      width: 100%;
    }

    &__content {
      display: flex;
      flex-direction: column;
      &__breadcrumb {
        padding: 0 25px;
        margin-bottom: 25px;
      }
      &__text {
        text-align: justify;
        padding: 0 25px;
        max-width: 867px;
        margin: 25px 0;

        figure {
          text-align: center;

          &.image {
            margin: auto;

            &.image-style-side {
              float: right;
              margin-left: 1.5em;
              max-width: 50%;

              @media screen and (max-width: 992px) {
                width: 70% !important;
                margin: auto;
                float: none;
                display: contents;
              }

              &.image_resized {
                max-width: 100%;
              }
            }
          }
        }
      }
    }

    &__last-posts {
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
}
</style>
