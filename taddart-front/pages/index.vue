<template>
  <div class="Home">
    <QuoteSection v-if="quoteSection.enable"
                  :content="quoteSection.content[$i18n.locale]"
                  :title="quoteSection.title[$i18n.locale]"
                  :horizontal-image="quoteSection.horizontalImage.formats | defaultImage"
                  :vertical-image="quoteSection.verticalImage.formats | defaultImage"
    ></QuoteSection>
    <SeparateLine :text-content="$t('last_article_title')"/>
    <LastArticlesSection></LastArticlesSection>
    <div class="Home__gallery-panel">
      <a :href="localePath('/gallery', $i18n.locale)">
        {{ $t('gallery_title') }}
      </a>
    </div>
  </div>
</template>
<script>
import articlesQuery from '@/apollo/queries/articles/articles.gql'
import QuoteSection from "@/components/home-section/quoteSection/QuoteSection";
import LastArticlesSection from "@/components/home-section/lastArticlesSection/LastArticlesSection";
import quoteQuery from "@/apollo/queries/home-section/quote.gql";

export default {
  name: "index",
  components: {
    QuoteSection,
    LastArticlesSection
  },
  apollo: {
    articles: {
      prefetch: true,
      query: articlesQuery,
      errorPolicy: "ignore"
    },
    quoteSection: {
      prefetch: true,
      query: quoteQuery,
      errorPolicy: "ignore"
    }
  }
}
</script>
<style lang="scss" scoped>
@import "assets/css/pallete";
.Home {
  padding-top: 70px;

  &__gallery-panel {
    width: 100%;
    height: 150px;
    font-size: 35px;
    background-color: $td-yellow;
    text-align: center;
    padding: 50px 0;
    margin: 40px 0;

    a {
      color: white !important;
      text-transform: uppercase;
      font-weight: bolder;
    }
  }
}

</style>
