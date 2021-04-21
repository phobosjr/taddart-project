<template>
<div class="Contact-form">
  <div class="Contact-form__main">
    <v-form class="Contact-form__main__form"
            ref="form"
            v-model="valid"
            lazy-validation>
      <v-text-field
        v-model="name"
        :label="$t('contact_form_name')"
        :rules="nameRules"
        class="Contact-form__main__form__text"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        :label="$t('contact_form_email')"
        :rules="emailRules"
        class="Contact-form__main__form__text"
        required
      ></v-text-field>
      <v-textarea
        v-model="message"
        :counter="120"
        :label="$t('contact_form_message')"
        value=""
        class="Contact-form__main__form__textarea"
      ></v-textarea>
      <div class="Contact-form__main__form__btn">
        <v-btn
          @click="submit()"
        >
          {{$t('contact_form_submit_btn')}}
        </v-btn>
      </div>
      <div class="Contact-form__main__form__alert">
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
          type="warning"
          dismissible
          v-if="alertFailed"
        >{{$t('contact_form_alert_failed_message')}}</v-alert>
      </div>
    </v-form>
  </div>

</div>
</template>

<script>

export default {
  name: "Contact-form",
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
        v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || 'E-mail must be valid',
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
        setTimeout(()=> {
          this.alertSuccess = false
        }, 5000)
      }).catch(()=> {
        this.alertFailed = true;
        setTimeout(()=> {
          this.alertFailed = false
        }, 5000)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.Contact-form {
  height: 500px;
  position: relative;
  margin: auto;
  display: flex;
  justify-content: center;
  padding: 0 25px;

  &__main {
    max-width: 500px;
    width: 100%;
    &__form {

      &__btn {
        position: relative;
      }
      &__alert {
        margin: 10px 0;
      }
    }
  }
}
</style>
