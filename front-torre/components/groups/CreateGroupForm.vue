<template>
  <form class="createGroupForm" @click.prevent>
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
        <button class="createGroupForm__item--button" @click="addMember">
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
    <p v-if="errorMsg" class="createGroupForm__error">{{ errorMsg }}</p>
    <button class="createGroupForm__button" @click="createGroup">
      Create group
    </button>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import UserCard from '@/components/users/UserCard'
import { parseError } from '~/utils/error'
export default {
  components: { UserCard },
  data() {
    return {
      name: '',
      description: '',
      curMemberName: '',
      errorMsg: null,
      members: [],
    }
  },
  methods: {
    async addMember() {
      this.errorMsg = null
      try {
        if (this.curMemberName === this.$store.getters['auth/username']) {
          this.errorMsg = 'You are already part of your group'
          return
        }

        const existingMember = this.members.find(
          (member) => member.publicId === this.curMemberName
        )

        if (existingMember) {
          this.errorMsg = 'Member is already in group'
          return
        }

        const user = await this.$axios.$get(
          `members/checkTorre?user=${this.curMemberName}`
        )
        if (!user) {
          this.errorMsg = 'User not found in Torre.co'
          return
        }
        this.members.push(user)
        this.curMemberName = ''
      } catch (err) {
        this.errorMsg = parseError(err)
      }
    },
    removeMember(index) {
      this.errorMsg = null
      this.members.splice(index, 1)
    },
    createGroup() {
      this.errorMsg = null
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      console.log(this.members.length)
      if (this.members.length === 0) {
        this.errorMsg = 'Group must have at least 1 additional member'
      }
      const members = this.members.map((member) => {
        return member.publicId
      })
      this.$emit('createGroup', {
        name: this.name,
        description: this.description,
        members,
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