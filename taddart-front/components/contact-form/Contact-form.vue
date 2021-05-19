<template>
  <div id="Contact-form" class="Contact-form" v-intersection="'Contact-form--visible'">
    <div class="Contact-form__label">
      <h3>{{ $t('contact_title') }}</h3>
    </div>
    <div class="Contact-form__main">
      <form class="Contact-form__main__form">
        <input-form :label="$t('contact_form_name')" :label_error="$t('contact_form_name_required')" rule="^$"/>
        <input-form :label="$t('contact_form_email')" :label_error="$t('contact_form_email_required')"/>
      </form>
    </div>
  </div>
</template>

<script>

import InputForm from "@/components/contact-form/InputForm";

export default {
  name: "Contact-form",
  components: {InputForm},
  data: () => {
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
    nameRules() {
      return [
        v => !!v || this.$t('contact_form_name_required'),
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ]
    },
    emailRules() {
      return [
        v => !!v || this.$t('contact_form_email_required'),
        v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || 'E-mail must be valid',
      ]
    }
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.$axios.$post(`${this.$config.clientSide.strapiBackendUrl}/contact-messages`, {
        name: this.name,
        email: this.email,
        message: this.message,
      }).then(() => {
        this.alertSuccess = true;
        setTimeout(() => {
          this.alertSuccess = false
        }, 5000)
      }).catch(() => {
        this.alertFailed = true;
        setTimeout(() => {
          this.alertFailed = false
        }, 5000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Contact-form {
  height: 500px;
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0 25px;

  @media (max-width: 992px) {
    flex-direction: column;
  }

  &--visible {
    div {
      transform: translate(0);
      opacity: 1;
    }
  }

  &__label {
    margin: auto 0;
    transform: translateY(400%);
    opacity: 0;
    transition: all 1s ease-in;

    @media (max-width: 992px) {
      text-align: center;
    }

    > * {
      text-transform: uppercase;
    }
  }

  &__main {
    max-width: 500px;
    width: 100%;
    margin: auto 0;
    transform: translatex(100%);
    opacity: 0;
    transition: all 1s ease-in;

    @media (max-width: 992px) {
      max-width: 100%;
    }

    &__form {

      display: flex;
      flex-direction: column;
      gap: 25px;
      &__btn {
        position: relative;
        background-color: $td-yellow;
        width: 100px;
        height: 50px;
        border: 1px solid $td-yellow;
        border-radius: 8px;
        color: white;

        &:hover {
          background-color: transparent;
          color: black;
        }

        &[disabled] {
          color: $td-black-43;
          background-color: $td-gray-61;
        }
      }

      &__alert {
        margin: 10px 0;

        .success--text {
          color: $td-green;
        }

        .warning--text {
          color: red;
        }
      }
    }
  }
}
</style>
