<template>
  <div :class="['Contact', 'position-relative', 'p-5']" :style="{backgroundImage: 'url(http://localhost:1337'+contact.background_image.url+')'}">

    <div class="Contact__title d-flex justify-content-center">
      <h1>{{ contact.title_label[locale] }}</h1>
    </div>

    <v-form class="Contact__form m-auto p-3"
            ref="form"
            v-model="valid"
            lazy-validation>
      <v-text-field
        v-model="name"
        :label="contact.name_label[locale]"
        :rules="nameRules"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :label="contact.email_label[locale]"
        :rules="emailRules"
        required
      ></v-text-field>

      <v-textarea
        v-model="message"
        :counter="120"
        :label="contact.message_label[locale]"
        value=""
      ></v-textarea>
      <div class="Contact__form__btn d-flex justify-content-end">
        <v-btn
          elevation="2"
          large
          class=""
          @click="submit()"
        >
          {{contact.button_label[locale]}}
        </v-btn>
      </div>
      <div class="Contact__form__alert p-2">
        <v-alert
          dense
          outlined
          type="success"
          dismissible
          v-if="alertSuccess"
        >{{contact.alert_success_label[locale]}}</v-alert>

        <v-alert
          dense
          outlined
          type="success"
          dismissible
          v-if="alertFailed"
        >{{contact.alert_failed_label[locale]}}</v-alert>
      </div>
    </v-form>

  </div>

</template>

<script>
import contactQuery from '@/apollo/queries/contact/contact.gql'
import {mapGetters} from "vuex";
export default {
  name: "contact",
  layout: 'layoutWithSmallHeader',
  computed: {
    ...mapGetters({
      locale: 'locale'
    })
  },
  data: ()=> {
    return {
      name: '',
      email: '',
      message: '',
      alertSuccess: false,
      alertFailed: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      valid: true
    }
  },
  apollo: {
    contact: {
      prefetch: true,
      query: contactQuery,
      error(error){
        console.log('error tetstsst',error);
      }
    }
  },
  methods: {
    submit () {
      if (! this.$refs.form.validate()){
        return;
      }
      this.$strapi.create('contact-messages',{
        name:this.name,
        email: this.email,
        message: this.message,
      }).then(()=>{
        this.alertSuccess = true;
      }).catch(()=> {
        this.alertFailed = true;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Contact {
  height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .Content__title {
    margin: 20px;
  }

  .Contact__form {
    height: 50vh;
    width: 60%;
    background-color: #ffffffad;
    right: 0;
    left: 0;
    top: 53px;

    .Contact__form__btn {
      margin-top: 10px;
    }
  }
}
</style>
