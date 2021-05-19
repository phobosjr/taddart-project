<template>
  <div class="Articles">
    <div class="Articles__breadcrumb">
      <a href="/">{{ $t('home_title') }}</a>
      /
      <span>{{ $t('articles_title') }}</span>

    </div>
    <div class="Articles__list" >
      <div v-for="article in articles" class="Articles__item">
        <div class="Articles__item__left-side">
          <div class="Articles__item__left-side__img" :style="{backgroundImage: 'url('+ getImageUrl(article)+')'}">
            <div class="Articles__item__left-side__category" :style="{backgroundColor: getArticleBackgroundColor(article)}">
              {{article.article_categorie.category}}
            </div>
            <div class="Articles__item__left-side__infos">
              <span class="author">{{ article.author }}</span>
              <span class="date">{{ article.created_at | formatDate(true) }}</span>
            </div>
          </div>
        </div>

        <div class="Articles__item__right-side">
          <div class="Articles__item__right-side__title">{{ article.title }}</div>
          <div class="Articles__item__right-side__summary" v-html="$options.filters.contentFilter(article.content)"></div>
          <a :href="`/article/${article.slug}`" class="Articles__item__right-side__link">
            <span >
              {{ $t('read_article_label') }}
            </span>
            <td-arrow-right></td-arrow-right>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import articlesQuery from "~/apollo/queries/articles/articles";
import tdArrowRight from '@/components/icons/td-arrow-right';

export default {
  name: "index",
  components: {
    tdArrowRight
  },
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
    },
    getArticleBackgroundColor (article) {
      return article?.article_categorie?.backgroundColor
    }
  }
}
</script>

<style lang="scss" scoped>
.Articles {
  min-height: 100vh;
  padding: 25px;
  width: 100%;

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 25px;

    @media screen and (max-width: 1700px) {
      grid-template-columns: 1fr 1fr;

    }

    @media screen and (max-width: 1130px) {
      grid-template-columns: 1fr;

    }

  }

  &__breadcrumb {
    padding: 0 25px;
  }

  &__item {
    $self: &;
    position: relative;
    width: 550px;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    gap: 0 15px;
    border: 3px solid $td-gray-61;

    @media screen and (max-width: 580px) {
      width: 100%;
    }

    @media screen and (max-width: 992px) {
      flex-direction: column;

      & > div {
        width: 100%;
      }
    }

    &__left-side {
      width: 100%;

      &__img {
        width: 100%;
        height: 300px;
        background-size: cover;
        background-color: $td-gray-61;
        background-blend-mode: multiply;
        grid-row: span 3;
        position: relative;
        transition: all .3s ease-in;

        &:before {
          content: ' ';
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: $td-black-43;
          z-index: 0;
        }
      }

      &__category {
        position: absolute;
        margin: auto;
        top: 10px;
        left: 10px;
        width: 100px;
        height: 50px;
        padding: 15px;
        text-align: center;
        color: white;
        font-weight: bolder;
      }
      &__infos {
        position: absolute;
        bottom: 10px;
        left: 10px;

        .author {
          color: white;
          font-weight: bolder;
        }

        .date {
          color: white;
        }

      }

    }

    &__right-side {
      width: 100%;
      display: flex;
      flex-direction: column;

      &__title {
        color: black;
        font-weight: bolder;
        font-size: 25px;
        margin: auto 0;
        padding: 0 10px;
      }

      &__summary {
        text-align: left;
        margin-bottom: 10px;
        height: 135px;
        text-overflow: ellipsis;
        white-space: normal;
        overflow: hidden;
        z-index: 1;
        padding: 0 10px;
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        text-align: justify;
      }

      &__link {
        width: 100%;
        height: 50px;
        padding: 0 25px;
        border-top: 2px solid $td-gray-61;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        &:hover {
          svg {
            transform: translateX(10px);
            fill: $td-green;;
          }
          span {
            color: $td-green;
          }
        }
        span {
          color: $td-blue;
          text-shadow: 0 0 0 #680606;
          font-size: 20px;
        }
        svg {
          float: right;
          color: $td-blue;
          transition: all .3s ease-in;
        }
      }
    }
  }
}
</style>
