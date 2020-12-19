<!-- This component renders a tab button-->

<template>
  <div
    class="button__selected"
    :class="{ selected: selected === button.id }"
    @click="select"
  >
    {{ button.name.toUpperCase() }}
  </div>
</template>

<script>
export default {
  props: {
    button: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    select() {
      this.$emit('selectTab', this.button)
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  &__selected {
    font-weight: 500.21;
    color: $white;
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 1.4rem 1.5rem 0.7rem 1.5rem;

    &:hover {
      color: $white;
    }

    &.selected {
      color: $accent;
      border-bottom: 3px solid $accent;
    }
  }
}
</style>
