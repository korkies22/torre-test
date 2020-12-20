<!-- Create group subpage
Here people create groups with their colleagues -->

<template>
  <div class="groupPage">
    <div class="groupPage__container">
      <div class="groupPage__heading">
        <p class="groupPage__arrow" @click="$router.push('/groups')">&larr;</p>
        <div class="groupPage__title--container">
          <h1 class="groupPage__title">
            {{ group.name }}&nbsp; (<img
              class="groupPage__icon"
              :src="require('@/assets/icons/weight.svg')"
            />
            {{ parseInt(group.totalWeight) }})
          </h1>
        </div>
        <span class="groupPage__filler"></span>
      </div>
      <GroupDetail :error-msg="errorMsg" :group="group"></GroupDetail>
    </div>
  </div>
</template>

<script>
import GroupDetail from '@/components/groups/GroupDetail'
import { parseError } from '~/utils/error'
export default {
  components: { GroupDetail },
  middleware: ['init-auth', 'authenticated'],
  layout: 'main',
  async fetch({ $axios, store, route }) {
    this.errorMsg = null
    try {
      await store.dispatch('groups/fetchGroup', route.params.id)
    } catch (e) {
      this.errorMsg = parseError(e)
    }
  },
  data() {
    return { errorMsg: null }
  },
  computed: {
    group() {
      return this.$store.getters['groups/curGroup']
    },
  },
  methods: {
    setErrorMsg(errorMsg) {
      this.errorMsg = errorMsg
    },
  },
}
</script>

<style lang="scss" scoped>
.groupPage {
  @include page;
  @include subPage;

  &__icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  &__title {
    display: flex;
    &--container {
      display: flex;
      align-items: center;
    }
  }

  &__filler {
    width: 3rem;
  }
}
</style>
