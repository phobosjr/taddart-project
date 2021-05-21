<template>
  <div id="Contact-form" class="Contact-form" v-intersection="'Contact-form--visible'">
    <div class="Contact-form__label">
      <h3>{{ $t('contact_title') }}</h3>
    </div>
    <div class="Contact-form__main">
      <form class="Contact-form__main__form">
        <input-form v-model="name" :label="$t('contact_form_name')" :label_error="$t('contact_form_name_required')"
                    :rule="emptyRules"/>
        <input-form v-model="email" :label="$t('contact_form_email')" :label_error="$t('contact_form_email_required')"
                    :rule="emailRules"/>
        <textarea-form v-model="message" :label="$t('contact_form_message')"
                       :label_error="$t('contact_form_message_required')" :rule="emptyRules"/>
        <div class="Contact-form__main__form__bottom">
          <div :class="['Contact-form__main__form__alert',
           {'Contact-form__main__form__alert--success': alertSuccess},
           {'Contact-form__main__form__alert--failed': alertFailed}]">
            <span v-if="alertSuccess">{{ $t('contact_form_alert_success_message') }}</span>
            <span v-if="alertFailed">{{ $t('contact_form_alert_failed_message') }}</span>
          </div>
          <button class="Contact-form__main__form__btn" @click="postMessage()" :disabled="!isFormValid">
            {{ $t('contact_form_submit_btn') }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>
<script>

import InputForm from "@/components/contact-form/InputForm";
import TextareaForm from "@/components/contact-form/TextareaForm";

export default {
  name: "Contact-form",
  components: {InputForm, TextareaForm},
  data: () => {
    return {
      name: '',
      email: '',
      message: '',
      emptyRules: '(.|\\s)*\\S(.|\\s)*',
      emailRules: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
      alertSuccess: false,
      alertFailed: false,
    }
  },
  computed: {
    isFormValid() {
      const emptyRegExp = new RegExp(this.emptyRules);
      const emailRegExp = new RegExp(this.emailRules);
      return (this.name !== null && emptyRegExp.test(this.name)) &&
        (this.email !== null && emailRegExp.test(this.email)) &&
        (this.message !== null && emptyRegExp.test(this.message));
    }
  },
  methods: {
    postMessage() {
      if (!this.isFormValid) {
        return;
      }
      debugger
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
    height: 100%;
    padding: 55px 0;
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
      align-items: flex-end;
      gap: 25px;
      position: relative;
      height: inherit;

      &__bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &__btn {
        background-color: $td-yellow;
        width: 100px;
        height: 50px;
        border-radius: 8px;
        color: white;
        cursor: pointer;

        &:hover {
          background-color: transparent;
          border: 1px solid $td-yellow;
          color: black;
        }

        &[disabled] {
          color: $td-black-43;
          background-color: $td-gray-61;
        }
      }

      &__alert {
        margin: 10px 0;

        &--success {
          color: $td-green;
        }

        &--failed {
          color: red;
        }
      }
    }
  }
}
</style>
