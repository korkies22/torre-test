<!-- Create group subpage
Here people create groups with their colleagues -->

<template>
  <div class="createGroupPage">
    <div class="createGroupPage__container">
      <div class="createGroupPage__heading">
        <p class="createGroupPage__arrow" @click="$router.push('/groups')">
          &larr;
        </p>
        <h1 class="createGroupPage__title">Create new group</h1>
        <span class="createGroupPage__filler"></span>
      </div>
      <CreateGroupForm
        :error-msg="errorMsg"
        @createGroup="createGroup"
        @error="setErrorMsg"
      ></CreateGroupForm>
    </div>
  </div>
</template>

<script>
import CreateGroupForm from '@/components/groups/CreateGroupForm'
import { parseError } from '~/utils/error'
export default {
  components: { CreateGroupForm },
  middleware: ['init-auth', 'authenticated'],
  layout: 'main',
  data() {
    return { errorMsg: null }
  },
  methods: {
    setErrorMsg(errorMsg) {
      this.errorMsg = errorMsg
    },
    async createGroup(groupInfo) {
      this.errorMsg = null
      try {
        const group = await this.$axios.$post('groups', groupInfo)
        this.$store.dispatch('groups/addGroup', group)
        this.$router.push('/groups')
      } catch (err) {
        this.errorMsg = parseError(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.createGroupPage {
  @include page;
  @include subPage;

  &__filler {
    width: 3rem;
  }
}
</style>
