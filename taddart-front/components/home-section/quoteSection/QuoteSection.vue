<template>
  <section class="Description">
    <div class="Description__picture">
      <div class="Description__picture__vertical" :style="{backgroundImage: 'url('+ verticalImage+')'}"></div>
      <div class="Description__picture__horizontal" :style="{backgroundImage: 'url('+ horizontalImage+')'}"></div>
    </div>
    <div class="Description__text" v-intersection>
      <div class="Description__text__title">
        <h2>{{ title }}</h2>
      </div>
      <div class="Description__text__content">
        <blockquote>{{ content }}</blockquote>
      </div>

    </div>

  </section>
</template>

<script>
export default {
  name: "QuoteSection",
  props: {
    title: {type: String, required: true},
    content: {type: String, required: true},
    horizontalImage: {type: String, required: true},
    verticalImage: {type: String, required: true}
  },
}
</script>

<style lang="scss" scoped>
.Description {
  width: 100%;
  height: 500px;
  position: relative;
  padding: 20px;
  display: flex;

  &__picture {
    width: 50%;
    height: 100%;

    @media screen and (max-width: 1480px){
      display: none;
    }

    &__horizontal {
      width: 500px;
      height: 320px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      opacity: 1;
      position: absolute;
      top: 91px;
      left: 200px;
      overflow: hidden;
    }

    &__vertical {
      width: 320px;
      height: 500px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      opacity: 1;
      position: absolute;
      top: 0px;
      left: 82px;
      overflow: hidden;
    }
  }

  &__text {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 1s ease-in;
    transform: translateY(100px);
    opacity: 0;


    @media screen and (max-width: 1480px){
      width: 100%;
    }
    &__title {
      width: 100%;
      color: rgba(0, 0, 0, 1);
      top: 57px;
      left: 619px;
      font-weight: bolder;
      font-size: 48px;
      opacity: 1;
      text-align: center;
      text-transform: uppercase;
    }

    &__content {
      padding: 10px;
      @media screen and (max-width: 1480px){
        width: 100%;
      }
      width: auto;
      color: #9c9c9c;
      font-weight: lighter;
      font-size: 18px;
      text-align: center;
      line-height: 2em;
    }
  }
}
</style>
