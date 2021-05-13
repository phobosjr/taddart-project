<template>
  <section class="Description">
    <div class="Description__title">
      <h4>{{ title }}</h4>
    </div>
    <div :class="['Description__content', {'Description__content--reverse': imagePosition === 'left'}]" v-intersection>
      <div :class="['Description__content__text', {'Description__content__text--full': !image || imagePosition === 'Off' } ]">
        <div v-html="content"></div>
      </div>
      <div v-if="image && imagePosition !== 'Off'" class="Description__content__image" :style="{backgroundImage: `url(${image.url})`}"></div>
    </div>

  </section>
</template>

<script>
export default {
  name: "QuoteSection",
  props: {
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: Object, required: true},
    imagePosition: {type: String, required: true},
  },
}
</script>

<style lang="scss" scoped>
.Description {
  width: 100%;
  height: 600px;
  padding: 25px 0;
  position: relative;
  display: flex;
  flex-direction: column;

  &__title {
    width: 100%;
    color: black;
    font-size: 25px;
    opacity: 1;
    text-align: center;
    text-transform: uppercase;
    margin: 25px 0;
  }

  &__content {
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 10px;
    &--reverse {
      flex-direction: row-reverse;
    }

    &__text {
      width: 50%;
      @media screen and (max-width: 992px ){
        width: 100%;
      }
      margin: auto;
      &--full {
        width: 100%;
      }
      div {
        width: fit-content;
        margin: auto;
      }
    }
    &__image {
      width: 50%;
      background-position: center;
      background-size: contain;
      @media screen and (max-width: 992px ){
        display: none;
      }
    }
  }
}
</style>
