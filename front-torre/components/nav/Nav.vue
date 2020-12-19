<template>
  <div class="nav">
    <div class="left">
      <h1 class="nav__title" @click="$router.push('/')">torre groups</h1>
    </div>
    <div class="right">
      <button class="nav__button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  background: $black;
  height: $navHeight;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);

  &__title {
    font-size: 1.5rem;
    cursor: pointer;
  }

  &__button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: bold;
  }
}
</style>
