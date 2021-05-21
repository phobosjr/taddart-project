<template>
  <nav class="Footer">
    <div class="Footer__content">
      <div class="Footer__content__col">
        <h3>{{ $t('footer_rubric-header_label') }}</h3>
        <ul class="Footer__content__col__list">
          <li><a :href="localePath('/gallery', $i18n.locale)">
            {{ $t('gallery_title') }}
          </a></li>
          <li><a :href="localePath('/contenu-numerique', $i18n.locale)">
            {{ $t('numeric_content_title') }}
          </a></li>
          <li><a :href="localePath('/articles', $i18n.locale)">
            {{ $t('articles_title') }}
          </a></li>

        </ul>
      </div>
      <div class="Footer__content__col">
        <h3>{{ $t('footer_about-header_label') }}</h3>
        <ul class="Footer__content__col__list">
          <li>
            <a href="#Contact-form">{{ $t('contact_title') }}</a></li>
          <li>
            <a href="www.facebook.com">
              {{ $t('follow_us_title_label') }}
              <img class="Footer__content__col__list__img" src="~/assets/images/facebook-logo-image.png">
            </a></li>
        </ul>
      </div>
    </div>
    <div class="Footer__copyright">
      <span>{{ $t('footer_copyrights_label') }} &copy; {{ new Date().getFullYear() }}</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss" scoped>
.Footer {
  width: 100%;
  height: 250px;
  padding: 35px 0;
  background-color: $td-gray-footer;
  position: relative;

  &__content {
    display: flex;
    flex-direction: row;
    margin: auto;
    color: white;
    max-width: 1000px;

    &__col {
      margin: 0 25px;

      &__list {
        list-style: none;
        padding-left: 10px;
        line-height: 30px;

        a {
         display: flex;
          gap: 10px;
        }
        &__img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  &__copyright {
    color: white;
    position: absolute;
    bottom: 10px;
    text-align: center;
    width: 100%;
    height: 25px;
  }


}


</style>
