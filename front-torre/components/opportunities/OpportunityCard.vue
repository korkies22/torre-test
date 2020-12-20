<template>
  <div class="opportunityCard">
    <div class="opportunityCard__card">
      <div class="opportunityCard__main">
        <div class="opportunityCard__left">
          <div class="opportunityCard__photo--container">
            <div class="opportunityCard__photo--background" />
            <div
              v-if="opportunity.organizations[0]"
              class="opportunityCard__photo"
              :style="{
                backgroundImage: `url(${opportunity.organizations[0].picture}) `,
              }"
            />
          </div>
          <h3 class="opportunityCard__name">{{ opportunity.objective }}</h3>
        </div>
        <div class="opportunityCard__info">
          <div class="opportunityCard__line">Due date: {{ parsedDate }}</div>
          <div class="opportunityCard__line">
            Status: {{ opportunity.status }}
          </div>
        </div>
      </div>
      <button
        v-if="$props.appliable"
        class="opportunityCard__button"
        :disabled="opportunity.status !== 'open'"
        @click="$emit('applyToOpportunity')"
      >
        Apply with a team
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    opportunity: { type: Object, required: true },
    appliable: { type: Boolean, default: false },
  },
  computed: {
    parsedDate() {
      const date = new Date(this.$props.opportunity.deadline)
      let month = date.getMonth() + 1
      let day = date.getDate()
      const year = date.getFullYear()
      if (day < 10) {
        day = '0' + day
      }
      if (month < 10) {
        month = '0' + month
      }
      return day + '-' + month + '-' + year
    },
  },
}
</script>

<style lang="scss" scoped>
.opportunityCard {
  margin: 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;

  &__button {
    @include button;
  }

  &__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__card {
    padding: 1rem;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    width: 40%;
    max-width: 70%;
    height: 4rem;
  }

  &__left {
    display: flex;
    align-items: center;
  }

  &__line {
    text-align: right;
    min-width: 10rem;
    text-transform: capitalize;
  }

  &__name {
    max-width: 70%;
    margin-left: 0.5rem;
  }

  &__photo {
    height: 5rem;
    width: 5rem;
    background: white;
    border: 1px solid white;
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
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

  &__remove {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
