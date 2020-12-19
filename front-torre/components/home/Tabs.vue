<!--This is the components which handles the main Tab visible in Home. It uses Tab button-->

<template>
  <div class="tabs">
    <TabButton
      v-for="(button, index) in tabs"
      :key="index"
      :button="button"
      :selected="selectedTab"
      @selectTab="$emit('selectTab', $event)"
    ></TabButton>
  </div>
</template>

<script>
import TabButton from './TabButton.vue'
export default {
  components: {
    TabButton,
  },
  props: { tabs: { type: Array, default: () => [] } },
  computed: {
    selectedTab() {
      for (const index in this.$props.tabs) {
        if (this.$route.path.includes(this.$props.tabs[index].route))
          return +index
      }
      return -1
    },
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  margin-bottom: 2rem;
  flex-direction: row;
  display: flex;
  justify-content: space-evenly;

  border-bottom: 1px solid $black;
}
</style>
