<template>
  <div class="Input-form">
    <label>{{ label }}</label>
    <div class="Input-form__input">
      <input type="text" v-model="inputValue" @blur="validateInput" :class="{'have-error': have_error}">
      <div v-if="have_error" class="Input-form__input__error">
        <span>{{ label_error }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'input-form',
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
      if (!this.inputValue && !regex.test(this.inputValue)) {
        this.have_error = true;
      } else {
        this.have_error = false;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Input-form {
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 6fr;
  align-items: center;

  label {
    font-size: 15px;
    font-family: 'Montserrat-Regular', sans-serif;
  }

  &__input {
    width: 100%;
    height: 100%;
    position: relative;

    input {
      border: 1px solid $td-black-43;
      padding: 15px;
      width: 100%;

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
