<template>
  <div class="Articles">
    <div class="Articles__breadcrumb">
      <a href="/">{{ $t('home_title') }}</a>
      /
      <span >{{ $t('articles_title') }}</span>

    </div>
    <div v-for="article in articles" class="Articles__item">
      <div class="Articles__item__img" :style="{backgroundImage: 'url('+ getImageUrl(article)+')'}">
        <div class="Articles__item__link">
          <a :href="`/article/${article.slug}`">
            {{ $t('read_article_label') }}
          </a>
        </div>
      </div>
      <div class="Articles__item__title">{{ article.title }}</div>
      <div class="Articles__item__summary" v-html="article.summary"></div>
      <div class="Articles__item__infos">
        <span>{{ article.author }}</span>
        <span>{{ article.created_at | formatDate(true) }}</span>
      </div>
    </div>

  </div>

</template>

<script>
import articlesQuery from "~/apollo/queries/articles/articles";

export default {
  name: "index",
  apollo: {
    articles: {
      prefetch: true,
      query: articlesQuery,
      errorPolicy: "ignore"
    }
  },
  methods: {
    getImageUrl(article) {
      return article?.image?.url
    }
  }
}
</script>

<style lang="scss" scoped>
.Articles {
  min-height: 100vh;
  padding: 25px;
  width: 100%;

  &__breadcrumb {
    padding: 0 25px;
  }

  &__item {
    $self: &;
    position: relative;
    max-width: 950px;
    margin: 10px auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 2fr .5fr;
    gap: 0 15px;
    border: 3px solid $td-gray-61;

    @media screen and (max-width: 992px){
      grid-template-columns: 1fr;
    }

    &__img {
      width: 100%;
      height: 300px;
      background-size: cover;
      background-color: $td-gray-61;
      background-blend-mode: multiply;
      grid-row: span 3;
      position: relative;
      &:before {
        content: ' ';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: $td-black-43;
        z-index: 0
      ;
      }
    }

    &__title {
      color: black;
      font-weight: bolder;
      font-size: 25px;
      margin: auto 0;
    }

    &__summary {
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
      text-align: justify;
    }

    &__infos {
      color: black;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 10px;
    }

    &__link {
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: fit-content;
      height: fit-content;
      background-color: brown;
      padding: 15px;

      a {
        color: white;
        text-shadow: 0 0 0 #680606;
        font-size: 20px;

      }
    }

  }

}
</style>
