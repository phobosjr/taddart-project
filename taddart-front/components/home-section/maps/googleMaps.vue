<template>
  <div class="maps-section">
    <div class="maps-section__iframe">
      <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Ait%20Abdelmoumene%202+(tuddar-nat-abdelmoumen)&amp;t=h&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
    </div>
    <div class="maps-section__title" v-intersection>
      <h3>{{ $t('maps_section_title_label') }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "googleMaps",

}
</script>

<style lang="scss" scoped>
.maps-section {
  width: 100%;
  height: 650px;
  display: flex;
  flex-direction: row;
  background-color: #77b5fe1f;

  @media screen and (max-width: 992px) {
    flex-direction: column-reverse;
  }

  &__iframe {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 992px) {
      width: 100%;
    }

    iframe {
      width: 80%;
      height: 80%;

      @media screen and (max-width: 992px) {
        width: 100%;
        height: 100%;
      }
    }
  }

  &__title {
    margin: auto;
    text-transform: uppercase;
    transition: all 1s ease-in;
    transform: translateY(100px);
    opacity: 0;

    @media screen and (max-width: 992px) {
      margin: 25px auto;
    }
  }

}
</style>
