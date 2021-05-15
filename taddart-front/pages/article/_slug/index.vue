<template>
  <div
    :class="['Article']" v-if="article">
    <div class="Article__header" :style="{backgroundImage: 'url('+$options.filters.defaultImage(articleImageUrl)+')'}">
      <div class="td-overlay"></div>
      <div class="Article__header__title">
        <h1 class=" font-weight-bolder text-uppercase mb-4">{{ article.title }}</h1>
      </div>
      <div class="Article__header__profile">
        <span> {{ $t('article_author_label') }}<strong>{{ article.author }}</strong></span>
        <span>{{ article.created_at | formatDate(true) }}</span>
        <div class="Article__header__profile__category" :style="{backgroundColor: getArticleCategoryColor(article)}">
          {{ getArticleCategory(article) }}
        </div>
      </div>
    </div>
    <div class="Article__main">
      <div class="Article__main__content">
        <div class="Article__main__content__breadcrumb">
          <a href="/">{{ $t('home_title') }}</a>
          /
          <a href="/articles">{{ $t('articles_title') }}</a>
          /
          <span>{{ article.title }}</span>
        </div>
        <div class="Article__main__content__text" v-html="article.content"></div>
        <article-comments v-if="article.enableComments" :article-id="article.id"></article-comments>
        <article-comment v-if="article.enableComments" :article-id="article.id"></article-comment>
      </div>
      <div class="Article__main__left-main">
        <div
          :class="['Article__main__left-main__content',  {'Article__main__left-main__content--fixed': fixedLeftMain}]">
          <div class="Article__main__left-main__infos">
            <h4>{{ $t('author_label') }}</h4>
            <div class="infos-item">
              <img src="~/assets/images/user-image.svg">

              <span><strong>{{ article.author }}</strong></span>
            </div>
            <div class="infos-item">
              <img src="~/assets/images/calendar-image.svg">
              <span>{{ article.created_at | formatDate(true) }}</span>
            </div>
            <div class="infos-item">
              <div class="Article__main__left-main__infos__category"
                   :style="{backgroundColor: getArticleCategoryColor(article)}">
                {{ getArticleCategory(article) }}
              </div>
            </div>

          </div>
          <div ref="last-post"
               class="Article__main__left-main__last-post">
            <h4>{{ $t('last_article_title') }}</h4>
            <div v-for="article in lastArticles" :key="article.id"
                 class="Article__main__left-main__last-post__article">
              <div class="Article__main__left-main__last-post__article__img"
                   :style="{backgroundImage: 'url('+getArticlePicture(article)+')'}">
              </div>
              <div class="Article__main__left-main__last-post__article__infos">
                <h4 class="Article__main__left-main__last-post__article__infos__title">{{ article.title }}</h4>
                <div class="Article__main__left-main__last-post__article__infos__author">
                  <div class="infos-item">
                    <img src="~/assets/images/user-image.svg">
                    <span>{{ article.author }}</span>
                  </div>
                </div>
                <div class="Article__main__left-main__last-post__article__infos__date">
                  <div class="infos-item">
                    <img src="~/assets/images/calendar-image.svg">
                    <span>{{
                        article.created_at | formatDate
                      }}</span>
                  </div>

                </div>
                <a :href="article.slug" class="Article__main__left-main__last-post__article__infos__link">
                  {{ $t('read_article_label') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <not-found-error v-else></not-found-error>
</template>

<script>
import articlePageQuery from '@/apollo/queries/article/article-page.gql'
import ArticleComments from "@/components/article-comments/article-comments";

export default {
  name: "Article",
  components: {ArticleComments},
  layout: 'layoutWithSmallHeader',
  data: () => {
    return {
      fixedLeftMain: false,
      article: {}
    }
  },
  async asyncData({app, route, error}) {
    const result = await app.apolloProvider.defaultClient
      .query({
        query: articlePageQuery,
        variables: {
          slug: route.params.slug,
          limit: 3
        }
      });
    if (result.data.fetchedArticle.length) {
      return {
        article: result.data.fetchedArticle[0],
        lastArticles: result.data.lastArticles?.filter(article => article.slug !== route.params.slug)
      }
    }
    error({statusCode: 404, message: 'Post not found'})
  },
  computed: {
    articleImageUrl() {
      return this.article?.image?.formats
    }
  },
  methods: {
    getFormatsFromImage(image) {
      return image?.formats;
    },
    getArticlePicture(article) {
      return this.$options.filters.thumbnailImage(article?.imageUrl?.formats);
    },
    getArticleCategory(article) {
      return article?.article_categorie?.category
    },
    getArticleCategoryColor(article) {
      return article?.article_categorie?.backgroundColor
    },
    handleScroll() {
      window.scrollY >= 560 ? this.fixedLeftMain = true : this.fixedLeftMain = false;
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
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
      left: 0;
      flex-direction: row;
      padding: 12px;
      max-width: fit-content;
      color: white;
      align-items: center;
      display: none;

      @media screen and (max-width: 1390px) {
        display: flex;
      }

      > * {
        margin: 0 10px;
        font-weight: bold;
      }

      &__category {
        color: white;
        padding: 10px;
        margin: 10px;
        border-radius: 15px;
        font-weight: 600;
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
      }
    }

    &__left-main {
      width: 500px;
      display: flex;
      flex-direction: column;
      position: relative;
      gap: 10px;
      @media screen and (max-width: 1390px) {
        display: none !important;
      }

      &__content {
        display: flex;
        flex-direction: column;
        gap: 12px;

        &--fixed {
          position: fixed;
          top: 88px;
        }
      }

      &__infos {
        display: flex;
        flex-direction: column;
        gap: 10px;

        &__category {
          color: white;
          padding: 10px;
          margin: 10px;
          border-radius: 15px;
          font-weight: 600;
        }
      }

      &__last-post {

        display: flex;
        flex-direction: column;
        gap: 10px;

        &__article {
          display: flex;
          flex-direction: row;

          &__img {
            width: 171px;
            height: 125px;
            margin: 2px 5px 2px 0px;
            background-color: $td-gray-61;
          }

          &__infos {

            display: flex;
            flex-direction: column;
            justify-content: space-between;


            &__date {
              font-size: 13px;
              color: gray;
              margin-bottom: 4px;
            }

            &__title {
              font-weight: bold;
              color: #680606;
            }

            &__link {
              float: right;
            }
          }
        }
      }
    }

    .infos-item {
      display: flex;
      align-items: stretch;
      gap: 15px;
    }
  }
}
</style>
