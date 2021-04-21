<template>
  <section class="LastArticles">
      <div v-for="article in lastArticles" class="LastArticles__article"
      @click="redirectToArticle(article.slug)"
      >
        <div class="LastArticles__article__image"
             :style="{backgroundImage: 'url('+$options.filters.defaultImage(article.imageUrl.formats)+')'}"></div>
        <div class="LastArticles__article__article-info">
          <span>{{ article.created_at | formatDate }}</span>
          <span>{{ $t('article_author_label') }}<strong>{{ article.author }}</strong></span>
        </div>
        <div class="LastArticles__article__title">
          {{ article.title }}
        </div>
        <div class="LastArticles__article__short-content" v-html="article.summary">
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
    redirectToArticle (slug) {
      this.$router.push(this.localePath('/article/'+slug, this.$i18n.locale))
    }
  }
}
</script>

<style lang="scss" scoped>
.LastArticles {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 555px;
  padding: 10px;
  transition: all .5s ease;
  transform: translateX(100%);
  &.visible {
    transform: translateX(0);
  }

  &__article {
    margin: 10px;
    width: 400px;
    cursor: pointer;

    &__image {
      max-width: 400px;
      height: 252px;
      background-size: cover;

      &:hover {
        transition: all .5s ease-in;
        -webkit-box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, 0.68);
        box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, 0.68);
      }
    }

    &__article-info {
      text-align-last: end;
      color: #747373;
      font-size: 15px;
      display: flex;
      justify-content: space-between;
    }

    &__title {
      font-size: 20px;
      font-weight: bolder;
      margin: 10px 0;
    }

    &__short-content {
      color: #7b7e85;
      text-align: left;
      margin-bottom: 10px;
    }
  }
}
</style>