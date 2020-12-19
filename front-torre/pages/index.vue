<!-- Home page, here people can see Groups and Opportunities -->

<template>
  <div class="home">
    <div class="home__container">
      <Tabs :tabs="tabs" @selectTab="changeTab($event)"></Tabs>
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script>
import Tabs from '@/components/home/Tabs'
export default {
  components: { Tabs },
  data() {
    return {
      selectedTab: 0,
      tabs: [
        { id: 0, name: 'Groups', route: '/groups' },
        { id: 1, name: 'Opportunities', route: '/opportunities' },
      ],
    }
  },
  methods: {
    changeTab(event) {
      this.selectedTab = event.id
      this.$router.push(this.tabs[event.id].route)
    },
  },
  middleware: ['init-auth', 'authenticated', 'redirect-child'],
  layout: 'main',
}
</script>

<style lang="scss" scoped>
.home {
  transition-duration: 500ms;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7)),
    url('~@/assets/images/loginBackground.jpg') no-repeat fixed center;
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;

  &__container {
    width: 80%;
    height: 100%;
    background: $black;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
    padding: 0 2rem;
  }
}
</style>
