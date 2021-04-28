<template>
  <div class="Home">
    <QuoteSection v-if="quoteSection.enable"
                  :content="quoteSection.content"
                  :title="quoteSection.title"
                  :horizontal-image="quoteSection.horizontalImage.formats | defaultImage"
                  :vertical-image="quoteSection.verticalImage.formats | defaultImage"
    ></QuoteSection>
    <SeparateLine :text-content="$t('last_article_title')"/>
    <LastArticlesSection></LastArticlesSection>
    <div class="Home__gallery-panel">
      <div class="Home__gallery-panel__link">
        <a :href="localePath('/gallery', $i18n.locale)">
          {{ $t('gallery_title') }}
        </a>
      </div>
    </div>
    <contact-form></contact-form>
    <google-maps></google-maps>
  </div>
</template>
<script>
import articlesQuery from '@/apollo/queries/articles/articles.gql'
import QuoteSection from "@/components/home-section/quoteSection/QuoteSection";
import LastArticlesSection from "@/components/home-section/lastArticlesSection/LastArticlesSection";
import googleMaps from "@/components/home-section/maps/googleMaps";
import quoteQuery from "@/apollo/queries/home-section/quote.gql";

export default {
  name: "index",
  components: {
    QuoteSection,
    LastArticlesSection,
    googleMaps
  },
  data() {
    return {}
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
      variables() {
        return {locale: this.$i18n.locale}
      },
      errorPolicy: "ignore"
    }
  }
}
</script>
<style lang="scss" scoped>

.Home {
  padding-top: 70px;
  overflow-x: hidden;

  &__gallery-panel {
    width: 100%;
    height: 110px;
    font-size: 25px;
    background-color: $td-blue;
    text-align: center;
    padding: 30px 0;
    background-image: url("assets/images/gallery-backgroung-image.jpg");
    background-position: top;
    background-attachment: fixed;

    &__link {
      transition: all 0.5s ease;
      &:hover {
        transform: translateX(25px);
      }

      a {
        color: black;
        text-transform: uppercase;
        font-weight: bolder;
        text-decoration: none;
      }
    }
  }

  &__numeric_content-panel {
    width: 100%;
    height: 110px;
    font-size: 35px;
    background-color: $td-blue;
    text-align: center;
    padding: 30px 0;
    margin: 40px 0;
    transition: all 0.5s ease;
    transform: translateX(-100%);

    &.visible {
      transform: translateX(0);
    }

    a {
      color: white !important;
      text-transform: uppercase;
      font-weight: bolder;
      text-decoration: none;
    }
  }
}

</style>
