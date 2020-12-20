<template>
  <div class="groupDetail">
    <p
      class="groupDetail__description"
      :class="{ missing: !$props.group.description }"
    >
      {{
        group.description
          ? group.description
          : "This group doesn't have a description"
      }}
    </p>
    <h2>Members</h2>
    <UserCard
      v-for="(member, index) in $props.group.members"
      :key="member.publicId"
      :user="member"
      @removeUser="removeMember(index)"
    >
    </UserCard>
  </div>
</template>

<script>
import UserCard from '@/components/users/UserCard'
export default {
  components: { UserCard },
  props: { group: { type: Object, required: true } },
}
</script>

<style lang="scss" scoped>
.groupDetail {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__description.missing {
    font-style: italic;
  }
}
</style>
