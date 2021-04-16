<template>
  <div class="Home p-5 justify-content-center">
    <QuoteSection v-if="quoteSection.enable"
                  :content="quoteSection.content[$i18n.locale]"
                  :title="quoteSection.title[$i18n.locale]"
                  :horizontal-image="quoteSection.horizontalImage.formats | defaultImage"
                  :vertical-image="quoteSection.verticalImage.formats | defaultImage"
    ></QuoteSection>

    <div class="Home__separate-line">
      <div class="text-center">
        <h3>{{ $t('last_article_title') }}</h3>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import articlesQuery from '@/apollo/queries/articles/articles.gql'
import QuoteSection from "@/components/home-section/quoteSection/QuoteSection";
import quoteQuery from "@/apollo/queries/home-section/quote.gql";

export default {
  name: "index",
  components: {
    QuoteSection
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
.Home {

  &__separate-line {
   margin-top: 20px;
  }

  hr {
    margin: 0 auto;
    margin-top: 13px;
    width: 20%;
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(7, 7, 7, 0.75), rgba(255, 255, 255, 0));
  }
}

</style>
