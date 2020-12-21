<template>
  <div class="loginPage">
    <div class="loginPage__main">
      <h1 class="loginPage__title">Login to torre-groups</h1>
      <LoginForm :error-msg="errorMsg" @login="loginUser"></LoginForm>
      <nuxt-link class="loginPage__navigate" to="/signup"
        >New? Create user!</nuxt-link
      >
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/login/LoginForm'
import { parseError } from '~/utils/error'
export default {
  components: { LoginForm },
  data() {
    return {
      errorMsg: null,
    }
  },
  methods: {
    async loginUser(data) {
      this.errorMsg = null
      try {
        console.log('ajam')

        const login = await this.$axios.$post(`auth`, data)
        this.$store.dispatch('auth/login', login)
        console.log('ajam')
        this.$router.push('/')
      } catch (err) {
        this.errorMsg = parseError(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.loginPage {
  background: $black;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7)),
    url('~@/assets/images/loginBackground.jpg') no-repeat fixed center;
  background-size: cover;

  &__main {
    padding: 2rem 2rem 1rem 2rem;
    width: 60%;
    background: $black;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
    border-radius: 3px;
  }

  &__navigate {
    text-align: center;
    margin-top: 1rem;
    display: block;
  }

  &__title {
    text-align: center;
  }
}
</style>
