<!-- Opportunities subpage
Here people see the available job offers -->

<template>
  <div class="opportunitiesPage">
    <h1 class="opportunitiesPage__title">Find your dream job</h1>
    <div class="opportunitiesPage__row">
      <input
        v-model="role"
        type="text"
        maxlength="30"
        class="opportunitiesPage__search"
        placeholder="Your dream job"
      />
      <button class="opportunitiesPage__button" @click="searchOpportunity">
        Search
      </button>
    </div>
    <OpportunitiesList></OpportunitiesList>
  </div>
</template>

<script>
import OpportunitiesList from '@/components/opportunities/OpportunitiesList'
export default {
  components: { OpportunitiesList },
  data() {
    return { role: '' }
  },
  methods: {
    searchOpportunity() {
      this.$store.dispatch('opportunities/setRole', this.role)
    },
  },
  middleware: ['init-auth', 'authenticated'],
}
</script>

<style lang="scss" scoped>
.opportunitiesPage {
  @include error;
  display: flex;
  flex-direction: column;

  &__search {
    background: $black;
    border: 1px solid white;
    border-radius: 3px;
    padding: 0.5rem 0.7rem;
    margin: 1rem 0;
    width: 100%;
    font-size: 0.9rem;
  }

  &__button {
    @include button;
    margin-left: 2rem;
  }

  &__row {
    display: flex;
    align-items: center;
  }

  &__title {
    text-align: center;
    margin: 0;
  }
}
</style>
