<template>
  <div class="Input-form">
    <label>{{ label }}</label>
    <div class="Input-form__input">
      <textarea type="text" v-model="inputValue" @blur="validateInput" @keyup="validateInput" :class="{'have-error': have_error}"></textarea>
      <div v-if="have_error" class="Input-form__input__error">
        <span>{{ label_error }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'textarea-form',
  props: {
    label: {type: String, required: false, default: ''},
    label_error: {type: String, required: false, default: ''},
    rule: {type: String, required: false, default: ''}
  },
  data: () => {
    return {
      inputValue: null,
      have_error: false
    }
  },
  methods: {
    validateInput() {
      const regex = new RegExp(this.rule);
      this.$emit('input', this.inputValue);
      this.have_error = this.inputValue === null || !regex.test(this.inputValue);
    }
  }
}
</script>
<style lang="scss" scoped>
.Input-form {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  align-items: center;

  label {
    font-size: 15px;
    text-transform: uppercase;
    font-weight: 600;
  }

  &__input {
    width: 100%;
    height: 100%;
    position: relative;

    textarea {
      border: 1px solid $td-black-30;
      padding: 15px;
      width: 100%;
      min-height: 170px;
      max-height: 250px;

      &.have-error {
        border: 1px solid #680606;
      }

      &:focus-visible {
        outline: none;
      }
    }

    &__error {
      position: absolute;
      right: 0;
      color: #680606;
    }
  }

}
</style>
