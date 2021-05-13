<template>
  <div class="Home">
    <QuoteSection v-if="quoteSection.enable"
                  :content="quoteSection.content"
                  :title="quoteSection.title"
                  :horizontal-image="quoteSection.horizontalImage.formats | defaultImage"
                  :vertical-image="quoteSection.verticalImage.formats | defaultImage"
    ></QuoteSection>
    <LastArticlesSection></LastArticlesSection>
    <LastAlbumSection></LastAlbumSection>
    <contact-form></contact-form>
    <google-maps></google-maps>
  </div>
</template>
<script>
import QuoteSection from "@/components/home-section/quoteSection/QuoteSection";
import LastArticlesSection from "@/components/home-section/lastArticlesSection/LastArticlesSection";
import LastAlbumSection from "@/components/home-section/lastAlbumSection/LastAlbumSection";
import googleMaps from "@/components/home-section/maps/googleMaps";
import quoteQuery from "@/apollo/queries/home-section/quote.gql";

export default {
  name: "index",
  components: {
    QuoteSection,
    LastArticlesSection,
    googleMaps,
    LastAlbumSection
  },
  data() {
    return {}
  },
  apollo: {
    quoteSection: {
      prefetch: true,
      query: quoteQuery,
      variables() {
        return {locale: this.$i18n.locale}
      },
      errorPolicy: "ignore"
    }
  },
}
</script>
<style lang="scss" scoped>

.Home {
  overflow-x: hidden;

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
