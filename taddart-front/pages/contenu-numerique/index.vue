<template>
  <div class="Contentu-numerique">
    <div v-for="fileCategory in fileContentCategories" class="Contentu-numerique__file-categories">
      <h3 class="Contentu-numerique__file-categories__title">{{ fileCategory[`title_${$i18n.locale}`] }}</h3>
      <div class="Contentu-numerique__file-categories__files">
        <div class="Contentu-numerique__file-categories__files__file" v-for="file in getFilesByCategory(fileCategory.id)">
          <div :style="{backgroundImage: 'url('+ $options.filters.thumbnailImage(file.thumbnail.formats)+')'}"
               class="Contentu-numerique__file-categories__files__file__thumbnail"></div>
          <div class="Contentu-numerique__file-categories__files__file__title"><strong>{{$t('numeric_content_title_label')}}</strong> {{ file.title[$i18n.locale] }}</div>
          <div class="Contentu-numerique__file-categories__files__file__author"><strong>{{$t('numeric_content_author_label')}}</strong> {{ file.author }}</div>
          <a :href="file.fileUrl.url"
             target="_blank" class="Contentu-numerique__file-categories__files__file__btn">{{ $t('numeric_content_btn_label') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import contentQuery from '@/apollo/queries/contenu-numerique/contenu.gql';
import categoryQuery from '@/apollo/queries/contenu-numerique/category.gql';

export default {
  name: "gellery",
  layout: 'layoutWithSmallHeader',
  components: {},
  apollo: {
    fileContents: {
      prefetch: true,
      query: contentQuery,
    },
    fileContentCategories: {
      prefetch: true,
      query: categoryQuery,
    }
  },
  methods: {
    getFilesByCategory(categoryId) {
      return this.fileContents.filter(file => file.file_content_category.id === categoryId);
    }
  }
}
</script>

<style lang="scss" scoped>
.Contentu-numerique {
  min-height: 100vh;
  padding: 25px 10px;

  &__file-categories {
    &__files {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 25px 0;

      &__file {
        width: 170px;
        height: 350px;
        margin: 0 25px;
        position: relative;

        &__thumbnail {
          width: 170px;
          height: 216px;
          background-size: cover;
          background-position: center;
          background-color: #7b7e85;
        }

        &__title, &__author {
          text-align: left;
          color: black;
          font-size: 15px;
        }
      }
    }
  }

  .td-overlay {
    position: absolute;
    top: 0;
  }
}
</style>
