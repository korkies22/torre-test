<!-- Create group subpage
Here people create groups with their colleagues -->

<template>
  <div class="groupPage">
    <div class="groupPage__container">
      <div class="groupPage__heading">
        <p class="groupPage__arrow" @click="$router.push('/groups')">&larr;</p>
        <div class="groupPage__title--container">
          <h1 class="groupPage__title">
            {{ group ? group.name : 'Invalid group' }}&nbsp; (<img
              class="groupPage__icon"
              :src="require('@/assets/icons/weight.svg')"
            />
            {{ group ? parseInt(group.totalWeight) : '' }})
          </h1>
        </div>
        <span class="groupPage__filler"></span>
      </div>
      <p v-if="errorMsg" class="groupPage__error">{{ errorMsg }}</p>
      <GroupDetail v-if="!errorMsg" :group="group"></GroupDetail>
    </div>
  </div>
</template>

<script>
import GroupDetail from '@/components/groups/GroupDetail'
import io from 'socket.io-client'
import { parseError } from '~/utils/error'
export default {
  components: { GroupDetail },
  middleware: ['init-auth', 'authenticated'],
  layout: 'main',
  async fetch() {
    try {
      const curGroup = await this.$store.dispatch(
        'groups/fetchGroup',
        this.$route.params.id
      )
      // If group not found, show message
      if (!curGroup) {
        this.errorMsg = 'Group not found. Please try again later'
        return
      }
      this.errorMsg = null
    } catch (e) {
      this.errorMsg = parseError(e)
    }
  },
  data() {
    return { errorMsg: 'init', socket: null }
  },
  computed: {
    group() {
      return this.$store.getters['groups/curGroup']
    },
  },
  created() {
    this.initWebsocket()
  },
  methods: {
    setErrorMsg(errorMsg) {
      this.errorMsg = errorMsg
    },
    initWebsocket() {
      const ws = io(this.$store.getters.url + 'group', {
        widthCredentials: false,
      })
      this.socket = ws
      // event emmited when connected
      ws.on('connect', () => {
        ws.emit('groupId', this.$route.params.id)
      })
      // event emmited when receiving message
      const vm = this
      ws.on('groupData', function (ev) {
        let parsedGroup
        try {
          parsedGroup = JSON.parse(ev)
          vm.$store.dispatch('groups/addGroup', parsedGroup)
          vm.$store.dispatch('groups/setCurGroup', parsedGroup)
        } catch (err) {
          // I don't know if I should do this in prod. For the moment I'll leave it like this
          console.log('Received invalid data from socket')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.groupPage {
  @include page;
  @include subPage;
  @include error;

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
