<template>
  <section class="LastArticles" v-intersection>
    <SeparateLine :text-content="$t('last_article_title')" :text-color="'black'"/>
    <div class="LastArticles__container">
      <div v-for="article in lastArticles" class="LastArticles__article"
           @click="redirectToArticle(article.slug)"
      >
        <div class="LastArticles__article__image"
             :style="{backgroundImage: 'url('+getArticlePicture(article)+')'}"
        ></div>
        <div class="LastArticles__article__overlay"></div>
        <div class="LastArticles__article__category" :style="{backgroundColor: getArticleCategoryColor(article)}">
          {{ getArticleCategory(article) }}
        </div>
        <div class="LastArticles__article__title" :style="{borderColor: getArticleCategoryColor(article)}">
          {{ article.title }}
        </div>
        <div class="LastArticles__article__article-info">
          <span>{{ article.created_at | formatDate(true) }}</span>
          <span>{{ $t('article_author_label') }}<strong>{{ article.author }}</strong></span>
        </div>
        <div class="LastArticles__article__short-content" v-html="article.summary"></div>

      </div>
    </div>
  </section>
</template>

<script>
import lastArticlesQuery from "@/apollo/queries/article/lastArticles";

export default {
  name: "LastArticlesSection",
  apollo: {
    lastArticles: {
      prefetch: true,
      query: lastArticlesQuery,
      variables() {
        return {limit: 6}
      }
    }
  },
  methods: {
    redirectToArticle(slug) {
      window.location = this.localePath('/article/' + slug, this.$i18n.locale);
    },
    getArticlePicture(article) {
      return this.$options.filters.thumbnailImage(article?.imageUrl?.formats);
    },
    getArticleCategory(article) {
      return article?.article_categorie?.category
    },
    getArticleCategoryColor(article) {
      return article?.article_categorie?.backgroundColor
    }
  }
}
</script>

<style lang="scss" scoped>
.LastArticles {

  min-height: 750px;
  background-attachment: fixed;
  background-position: top;
  overflow: hidden;
  &__container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    transition: all 1s ease-in;
    transform: translateY(100%);
    opacity: 0;
    max-width: 1300px;
    margin: auto;
  }

  &.visible {
    > * {
      transform: translateX(0);
      opacity: 1;
    }
  }

  &__article {
    $self: &;
    margin: 10px;
    width: 370px;
    height: 410px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 0px 6px 1px #0a0a0a94;

    &:hover {
      #{$self}__image {
        transform: scale(1.1);
      }
    }

    &__overlay {
      width: 100%;
      height: 100%;
      background-color: rgb(0 0 0 / 45%);
      position: absolute;
    }

    &__category {
      color: white;
      padding: 10px 24px;
      margin: 10px;
      border-radius: 4px;
      font-weight: 600;
      z-index: 1;
      width: fit-content;
    }

    &__image {
      width: 100%;
      height: 100%;
      background-size: cover;
      position: absolute;
      transition: all .5s ease-in;
    }

    &__article-info {
      text-align-last: end;
      color: white;
      font-size: 13px;
      font-style: italic;
      display: flex;
      gap: 10px;
      z-index: 1;
      padding: 10px;
      width: 100%;
    }

    &__title {
      font-size: 25px;
      width: fit-content;
      color: white;
      font-weight: bolder;
      margin: 10px 10% 0 0;
      z-index: 1;
      padding: 10px;
      border-bottom: 5px solid;
    }

    &__short-content {
      text-align: left;
      margin-bottom: 10px;
      height: 144px;
      text-overflow: ellipsis;
      white-space: normal;
      overflow: hidden;
      z-index: 1;
      padding: 0 10px;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
