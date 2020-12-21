<!-- Groups subpage
Here people see the groups they're part in and can create new groups -->

<template>
  <div class="groupsPage">
    <h1 class="groupsPage__title">Your groups</h1>
    <div class="groupsPage__create" @click="$router.push('/create-group')">
      <div class="circle">+</div>
      <p class="groupsPage__create--text">Create group</p>
    </div>
    <p v-if="errorMsg" class="groupsPage__error">{{ errorMsg }}</p>
    <GroupsList
      :groups="groups"
      @groupClicked="($event) => $router.push(`/groups/${$event._id}`)"
    ></GroupsList>
  </div>
</template>

<script>
import GroupsList from '@/components/groups/GroupsList'
import { parseError } from '~/utils/error'
export default {
  components: { GroupsList },
  async fetch() {
    try {
      this.$store.dispatch('groups/resetList')
      await this.$store.dispatch('groups/fetchGroups')
      this.errorMsg = null
    } catch (e) {
      this.errorMsg = parseError(e)
    }
  },
  data() {
    return { errorMsg: 'init' }
  },
  computed: {
    groups() {
      return this.$store.getters['groups/groups']
    },
  },
  middleware: ['init-auth', 'authenticated'],
}
</script>

<style lang="scss" scoped>
.groupsPage {
  @include error;
  display: flex;
  flex-direction: column;
  &__create {
    margin-left: auto;
    align-self: flex-end;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 1rem;
    cursor: pointer;

    &--text {
      margin-left: 0.5rem;
    }
  }
  &__title {
    text-align: center;
    margin: 0;
  }
}
</style>
