<template>
  <div>
    <!--<Header></Header>-->
    <div>
      <v-container>
        <nuxt/>
      </v-container>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  components: {Header},
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
