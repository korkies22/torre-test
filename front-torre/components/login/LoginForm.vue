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
    <div v-if="$props.signup" class="loginForm__item">
      <p class="loginForm__item--title">Confirm Password</p>
      <input
        v-model="confirmPassword"
        type="password"
        class="loginForm__input"
        placeholder="Confirm Password"
        maxlength="20"
      />
      <p
        v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.required"
        class="loginForm__error"
      >
        Passwords should match
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
    <button class="loginForm__button">{{ signup ? 'Signup' : 'Login' }}</button>
    <p v-if="$props.errorMsg" class="loginForm__error">
      {{ $props.errorMsg }}
    </p>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  props: {
    errorMsg: { type: String, default: '' },
    signup: { type: Boolean, default: false },
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
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
    isSignup() {
      return this.$props.signup
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
    confirmPassword: {
      required(v, vm) {
        return !vm.isSignup || vm.password === vm.confirmPassword
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.loginForm {
  @include formItem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__button {
    @include button;
    margin-top: 1rem;
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
