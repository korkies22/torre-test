<template>
  <form class="loginForm" @submit.prevent="submitForm">
    <div class="loginForm__item">
      <p class="loginForm__item--title">Username</p>
      <input
        v-model="username"
        type="text"
        class="loginForm__input"
        placeholder="Username"
        maxlength="20"
      />
      <p
        v-if="$v.username.$dirty && !$v.username.required"
        class="loginForm__error"
      >
        Username is required
      </p>
      <p
        v-else-if="$v.username.$dirty && !$v.username.minLength"
        class="loginForm__error"
      >
        Username must be at least 4 characters long
      </p>
    </div>
    <div class="loginForm__item">
      <p class="loginForm__item--title">Password</p>
      <input
        v-model="password"
        type="password"
        class="loginForm__input"
        placeholder="Password"
        maxlength="20"
      />
      <p
        v-if="$v.password.$dirty && !$v.password.required"
        class="loginForm__error"
      >
        Password is required
      </p>
      <p
        v-else-if="$v.password.$dirty && !$v.password.minLength"
        class="loginForm__error"
      >
        Password must be at least 6 characters long
      </p>
    </div>
    <div class="loginForm__rememberMe">
      <input
        id="selectAll"
        v-model="rememberMe"
        type="checkbox"
        class="checkBox"
        name="selectAll"
      />
      <label for="selectAll" class="loginForm__label">Remember me</label>
    </div>
    <button class="loginForm__button">Login</button>
    <p v-if="$props.errorMsg" class="loginForm__error">
      {{ $props.errorMsg }}
    </p>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  props: { errorMsg: { type: String, default: '' } },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    rememberMe: {
      get() {
        return this.$store.getters['auth/rememberMe']
      },
      set(value) {
        this.$store.commit('auth/setRememberMe', value)
      },
    },
  },
  methods: {
    submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.$emit('login', { username: this.username, password: this.password })
    },
  },
  validations: {
    username: {
      required,
      minLength: minLength(4),
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
}
</script>

<style lang="scss" scoped>
.loginForm {
  @include error;
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
    margin: 0.2rem 0 0 0;
    width: 100%;
    font-size: 0.9rem;
  }

  &__item {
    width: 100%;
    display: inline-block;
    padding: 0 5rem;
    margin-bottom: 1rem;
    &--title {
      margin: 0;
      color: $accent;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }

  &__rememberMe {
    color: $black;
    padding-right: 5rem;
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
}
</style>
