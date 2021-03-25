<template>
  <div class="NotFountError d-flex flex-column">
    <h1 class="font-weight-bolder"
    >404</h1>
    <p>{{notFoundPage.subTitle['kb']}}</p>
  </div>
</template>

<script>
import notFoundErrorQuery from '@/apollo/queries/notFoundError/notFoundError.gql'

export default {
  name: "not-found-error",

  apollo: {
    notFoundPage: {
      prefetch: true,
      query: notFoundErrorQuery,
      result (result) {
        console.log(result);
      }
    }
  },
}
</script>

<style lang="scss" scoped>

.NotFountError {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: fit-content;

  h1 {
    font-size: 170px;
  }

}


</style>
