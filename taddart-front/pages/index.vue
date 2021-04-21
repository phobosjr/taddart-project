<template>
  <div class="Home">
    <QuoteSection v-if="quoteSection.enable"
                  :content="quoteSection.content[$i18n.locale]"
                  :title="quoteSection.title[$i18n.locale]"
                  :horizontal-image="quoteSection.horizontalImage.formats | defaultImage"
                  :vertical-image="quoteSection.verticalImage.formats | defaultImage"
    ></QuoteSection>
    <SeparateLine :text-content="$t('last_article_title')"/>
    <LastArticlesSection v-waypoint="{ active: true, callback: onWaypoint}"></LastArticlesSection>
    <div :class="['Home__gallery-panel']"
         v-waypoint="{ active: true, callback: onWaypoint}">
      <a :href="localePath('/gallery', $i18n.locale)">
        {{ $t('gallery_title') }}
      </a>
    </div>
    <SeparateLine :text-content="$t('contact_title')"/>

    <contact-form></contact-form>
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
  data() {
    return {
    }
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
  },
  methods: {
    onWaypoint({el, going}) {
      if (going === this.$waypointMap.GOING_IN) {
        el.classList.add('visible')
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.Home {
  padding-top: 70px;

  &__gallery-panel {
    width: 100%;
    height: 110px;
    font-size: 35px;
    background-color: #e9bd15;
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
