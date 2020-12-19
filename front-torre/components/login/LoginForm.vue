<template>
  <form class="loginForm" @submit.prevent="submitForm">
    <div class="loginForm__item">
      <p class="loginForm__item--title">Username</p>
      <input
        type="text"
        class="loginForm__input"
        placeholder="Username"
        maxlength="20"
      />
    </div>
    <div class="loginForm__item">
      <p class="loginForm__item--title">Password</p>
      <input
        type="password"
        class="loginForm__input"
        placeholder="Password"
        maxlength="20"
      />
    </div>
    <button class="loginForm__button">Login</button>
    <nuxt-link to="/signup">Navigate</nuxt-link>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  methods: {
    submitForm() {
      console.log('enter')
    },
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
    },
    password: {
      required,
      minLength: minLength(6),
      goodPassword: (password) => {
        // custom validator!
        return (
          password.length >= 0 &&
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password) &&
          /[0-9]/.test(password)
        )
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.loginForm {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__button {
    background: $accent;
    border-radius: 3px;
    font-weight: lighter;
    color: $black;
    padding: 0.4rem 2rem;
    cursor: pointer;
    font-size: 1.2rem;
    border: none;
    margin-top: 1rem;
  }

  &__input {
    background: $black;
    border: 1px solid white;
    border-radius: 3px;
    padding: 0.5rem 0.7rem;
    margin: 0.2rem 0 1rem 0;
    width: 100%;
    font-size: 0.9rem;
  }

  &__item {
    width: 100%;
    display: inline-block;
    padding: 0 5rem;
    &--title {
      margin: 0;
      color: $accent;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
}
</style>
