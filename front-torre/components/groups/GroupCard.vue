<template>
  <div class="groupCard" @click="$emit('cardClicked')">
    <div class="groupCard__card">
      <div class="groupCard__left">
        <h3 class="groupCard__name">{{ group.name }}</h3>
      </div>

      <div class="groupCard__info">
        <div class="groupCard__line">Members: {{ group.members.length }}</div>
        <div class="groupCard__line">
          Weight: {{ parseInt(group.totalWeight) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: { type: Object, required: true },
  },
}
</script>

<style lang="scss" scoped>
.groupCard {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  &__card {
    padding: 1rem;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__left {
    display: flex;
    align-items: center;
  }

  &__line {
    text-align: right;
  }

  &__name {
    max-width: 50%;
    margin-left: 0.5rem;
  }

  &__remove {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    max-width: 70%;
  }

  &__photo {
    height: 5rem;
    width: 5rem;
    background: white;
    border: 1px solid white;
    position: absolute;

    @include hexagon;

    &--background {
      height: 5.5rem;
      width: 5.5rem;
      position: absolute;

      background: $grey;
      @include hexagon;
    }

    &--container {
      display: flex;
      width: 5.5rem;
      height: 5.5rem;
      justify-content: center;
      align-items: center;
      position: relative;
    }
  }
}
</style>
