<template>
  <div class="loginPage">
    <div class="loginPage__main">
      <h1 class="loginPage__title">Sign up to Torre groups</h1>
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/login/LoginForm'

export default {
  components: { LoginForm },
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
    padding: 2rem;
    width: 60%;
    background: $black;
    height: 60%;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
    border-radius: 3px;
  }

  &__title {
    text-align: center;
  }
}
</style>
