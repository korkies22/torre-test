<template>
  <form class="createGroupForm">
    <div class="createGroupForm__item">
      <p class="createGroupForm__item--title">Name</p>
      <input
        v-model="name"
        type="text"
        class="createGroupForm__input"
        placeholder="Group name"
        maxlength="20"
      />
      <p
        v-if="$v.name.$dirty && !$v.name.required"
        class="createGroupForm__error"
      >
        Name is required
      </p>
      <p
        v-else-if="$v.name.$dirty && !$v.name.minLength"
        class="createGroupForm__error"
      >
        Name must be at least 6 characters long
      </p>
    </div>
    <div class="createGroupForm__item">
      <p class="createGroupForm__item--title">Description</p>
      <textarea
        v-model="description"
        type="text"
        rows="5"
        class="createGroupForm__input"
        placeholder="Group description (Optional)"
        maxlength="1000"
      />
    </div>
    <h2>Record a video for your group</h2>
    <RecordVideo :file="file" @setFile="file = $event"></RecordVideo>

    <div class="createGroupForm__item">
      <p class="createGroupForm__item--title">Members</p>
      <div class="createGroupForm__item--row">
        <input
          v-model="curMemberName"
          type="text"
          class="createGroupForm__input"
          placeholder="Member name"
          maxlength="20"
        />
        <button
          class="createGroupForm__item--button"
          @click.prevent="addMember"
        >
          Add
        </button>
      </div>
      <UserCard :user="$store.getters['auth/user']"> </UserCard>
      <UserCard
        v-for="(member, index) in members"
        :key="member.publicId"
        :user="member"
        :removable="true"
        @removeUser="removeMember(index)"
      >
      </UserCard>
    </div>
    <p v-if="$props.errorMsg" class="createGroupForm__error">
      {{ $props.errorMsg }}
    </p>
    <button class="createGroupForm__button" @click.prevent="createGroup">
      Create group
    </button>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import UserCard from '@/components/users/UserCard'
import RecordVideo from '@/components/util/RecordVideo'
import { parseError } from '~/utils/error'

export default {
  components: { UserCard, RecordVideo },
  props: {
    errorMsg: { type: String, default: '' },
  },
  data() {
    return {
      name: '',
      description: '',
      curMemberName: '',
      members: [],
      file: null,
    }
  },
  methods: {
    async addMember() {
      this.$emit('error', null)
      try {
        if (!this.curMemberName) {
          return
        }
        if (this.curMemberName === this.$store.getters['auth/username']) {
          this.$emit('error', 'You are already part of your group')
          return
        }

        const existingMember = this.members.find(
          (member) => member.publicId === this.curMemberName
        )

        if (existingMember) {
          this.$emit('error', 'Member is already in group')
          return
        }

        const user = await this.$axios.$get(
          `members/checkTorre?user=${this.curMemberName}`
        )
        if (!user) {
          this.$emit('error', 'User not found in torre.co')
          return
        }
        this.members.push(user)
        this.curMemberName = ''
      } catch (err) {
        this.$emit('error', parseError(err))
      }
    },
    removeMember(index) {
      this.$emit('error', null)
      this.members.splice(index, 1)
    },
    createGroup() {
      this.$emit('error', null)
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      if (this.members.length === 0) {
        this.$emit('error', 'Group must have at least 1 additional member')
        return
      }
      const members = this.members.map((member) => {
        return member.publicId
      })
      this.$emit('createGroup', {
        name: this.name,
        description: this.description,
        members,
        file: this.file,
      })
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
  },
}
</script>

<style lang="scss" scoped>
.createGroupForm {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include formItem;

  &__button {
    padding: 0.6rem 2rem;
    margin-top: 1rem;
  }

  &__error {
    margin-bottom: 1rem;
  }
}
</style>
