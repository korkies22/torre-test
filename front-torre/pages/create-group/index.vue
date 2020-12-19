<!-- Create group subpage
Here people create groups with their colleagues -->

<template>
  <div class="createGroupPage">
    <div class="createGroupPage__container">
      <div class="createGroupPage__heading">
        <div class="createGroupPage__arrow" @click="$router.push('/groups')">
          &larr;
        </div>
        <h1 class="createGroupPage__title">Create new group</h1>
        <span class="createGroupPage__filler"></span>
      </div>
      <CreateGroupForm></CreateGroupForm>
    </div>
  </div>
</template>

<script>
import CreateGroupForm from '@/components/groups/CreateGroupForm'
export default {
  components: { CreateGroupForm },
  middleware: ['init-auth', 'authenticated'],
  layout: 'main',
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
