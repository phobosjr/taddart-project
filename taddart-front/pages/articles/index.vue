<template>
  <div class="Articles">

    <div v-for="article in articles" class="Articles__item">
      <div class="Articles__item__img" :style="{backgroundImage: 'url('+ article.image.url+')'}"></div>
      <div class="Articles__item__title">{{article.title}}</div>
      <div class="Articles__item__author">{{article.author}}</div>
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
  }
}
</script>

<style lang="scss" scoped>
.Articles {
  height: 100vh;
  padding: 25px;
  &__item {
    $self: &;
    position: relative;
    &:first-child{

      width: 100%;
      height: 300px;
      #{$self}__img {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: cover;
        z-index: -1;
      }

      #{$self}__title {
        color: white;
        font-weight: bolder;
        font-size: 35px;
        height: 50px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
      }
      #{$self}__author {
        color: white;
        position: absolute;
        bottom: 0;
        right: 10px;
      }
    }

  }

}
</style>
