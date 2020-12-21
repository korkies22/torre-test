<template>
  <div class="groupsList">
    <GroupCard
      v-for="group in groups"
      :key="group._id"
      :group="group"
      @cardClicked="$emit('groupClicked', group)"
      >{{ group }}</GroupCard
    >
  </div>
</template>

<script>
import GroupCard from './GroupCard'
export default {
  component: { GroupCard },
  props: { groups: { type: Array, required: true } },
}
</script>
