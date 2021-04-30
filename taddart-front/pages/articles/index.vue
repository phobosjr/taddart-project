<template>
  <div class="Articles">

    <div v-for="article in articles" class="Articles__item">
      <div class="Articles__item__img" :style="{backgroundImage: 'url('+ article.image.url+')'}"></div>
      <div class="Articles__item__title">{{ article.title }}</div>
      <div class="Articles__item__title">{{ article.summary }}</div>
      <div class="Articles__item__author">{{ article.author }}</div>
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
  width: 100%;

  &__item {
    $self: &;
    position: relative;
    width: 990px;
    margin: 0 auto;

    &:first-child {
      width: 550px;
      height: 550px;
      overflow: hidden;
      display: flex;

      &:hover {
        #{$self}__img {
          transform: scale(1.1);
        }
      }

      #{$self}__img {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: cover;
        z-index: -1;
        transition: all .5s ease-in;
      }


      #{$self}__title {
        color: white;
        font-weight: bolder;
        font-size: 25px;
        margin: auto 0;
      }

      #{$self}__author {
        color: white;
      }
    }

  }

}
</style>
