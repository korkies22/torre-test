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
    <Video v-if="group.videoURL" :file-u-r-l="group.videoURL"></Video>
    <h2>Members</h2>
    <UserCard
      v-for="(member, index) in $props.group.members"
      :key="member.publicId"
      :user="member"
      @removeUser="removeMember(index)"
    >
    </UserCard>
    <h2 v-if="$props.group.opportunities.length > 0">Opportunities</h2>
    <OpportunityCard
      v-for="(opportunity, index) in $props.group.opportunities"
      :key="index"
      :index="index"
      :opportunity="opportunity"
    >
    </OpportunityCard>
  </div>
</template>

<script>
import Video from '@/components/util/Video'
import UserCard from '@/components/users/UserCard'
export default {
  components: { UserCard, Video },
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
