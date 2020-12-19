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
  @include page;
}
</style>
