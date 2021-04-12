<template>
  <div :class="['Contact', 'position-relative', 'p-5']" :style="{backgroundImage: 'url('+$options.filters.defaultImage(contact.background_image.formats)+')'}">
    <div class="Contact__title d-flex justify-content-center">
      <h1>{{ $t('contact_title') }}</h1>
    </div>
    <div class="position-relative">
    <v-form class="Contact__form m-auto p-3"

              ref="form"
              v-model="valid"
              lazy-validation>
        <v-text-field
          v-model="name"
          :label="$t('contact_form_name')"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :label="$t('contact_form_email')"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-textarea
          v-model="message"
          :counter="120"
          :label="$t('contact_form_message')"
          value=""
        ></v-textarea>
        <div class="Contact__form__btn d-flex justify-content-end">
          <v-btn
            elevation="2"
            large
            class=""
            @click="submit()"
          >
            {{$t('contact_form_submit_btn')}}
          </v-btn>
        </div>
        <div class="Contact__form__alert p-2">
          <v-alert
            dense
            outlined
            type="success"
            dismissible
            v-if="alertSuccess"
          >{{$t('contact_form_alert_success_message')}}</v-alert>

          <v-alert
            dense
            outlined
            type="success"
            dismissible
            v-if="alertFailed"
          >{{$t('contact_form_alert_failed_message')}}</v-alert>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import contactQuery from '@/apollo/queries/contact/contact.gql'
export default {
  name: "contact",
  layout: 'layoutWithSmallHeader',
  data: ()=> {
    return {
      name: '',
      email: '',
      message: '',
      alertSuccess: false,
      alertFailed: false,
      valid: true
    }
  },
  apollo: {
    contact: {
      prefetch: true,
      query: contactQuery,
      errorPolicy: "ignore"
    }
  },
  computed: {
    nameRules () {
      return [
        v => !!v || this.$t('contact_form_name_required'),
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ]
    } ,
    emailRules() {
      return [
        v => !!v || this.$t('contact_form_email_required'),
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ]
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
    },
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
    height: 500px;
    width: 60%;
    background-color: #ffffffad;
    .Contact__form__btn {
      margin-top: 10px;
    }
  }
}
</style>
