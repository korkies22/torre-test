<template>
  <div class="userCard">
    <div class="userCard__card" :class="{ removable }">
      <div class="userCard__photo--container">
        <div class="userCard__photo--background" />
        <img class="userCard__photo" :src="user.picture" />
      </div>
      <div class="userCard__info">
        <div class="userCard__headline">{{ user.professionalHeadline }}</div>
        <div class="userCard__weight">Weight: {{ parseInt(user.weight) }}</div>
      </div>
    </div>
    <p
      v-if="$props.removable"
      class="userCard__remove"
      @click="$emit('removeUser')"
    >
      X
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
    removable: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss" scoped>
.userCard {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  width: 100%;
  &__card {
    padding: 1rem;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: space-between;
    width: 100%;

    &.removable {
      margin-right: 1rem;
    }
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
