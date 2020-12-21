<!-- Este modal se activa una vez el usuario haya calcular tu mejor opcion, luego le aparecerea el boton para
agregar todas las ofertas a la bolsa de pagos, aqui se lo mostrara el mensaje que le confirmara que se han agregado
exitosamente -->

<template>
  <div class="modal" @click.stop>
    <div class="modal__backdrop" @click.stop="close"></div>
    <div class="modal__main">
      <div v-if="step === 0" class="modal__content">
        <h1>Apply to Opportunity</h1>
        <p class="modal__text">
          Choose the perfect group that fits with this job
        </p>
        <p v-if="errorMsg" class="modal__error">{{ errorMsg }}</p>

        <GroupsList
          v-if="!isLoading"
          class="modal__list"
          :groups="filteredGroups"
          @groupClicked="setStep(1, $event)"
        ></GroupsList>
        <div v-else class="modal__loading">
          <div class="spinner"></div>
          <p class="modal__loading--message">Fetching group data...</p>
        </div>
      </div>
      <div v-if="step === 1 && curGroup" class="modal__content">
        <div class="modal__header">
          <p class="modal__arrow" @click="setStep(0)">&larr;</p>
          <h1>Confirm group</h1>
        </div>
        <p class="modal__text">
          Are you sure that you want to apply with this group?
        </p>
        <h1 class="modal__title">
          {{ curGroup.name }}&nbsp; (<img
            class="modal__icon"
            :src="require('@/assets/icons/weight.svg')"
          />
          {{ parseInt(curGroup.totalWeight) }})
        </h1>
        <button class="modal__button" @click="applyWithGroup">
          Apply with group
        </button>
        <p v-if="errorMsg" class="modal__error">{{ errorMsg }}</p>
        <GroupDetail :group="curGroup"></GroupDetail>
      </div>
      <div v-else-if="step === 1" class="modal__content">
        <div class="modal__header">
          <p class="modal__arrow" @click="setStep(0)">&larr;</p>
          <h1>Problem fetching group</h1>
        </div>
        <p class="modal__text">
          We had a problem fetching this group. Please try again later
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import GroupDetail from '@/components/groups/GroupDetail'
import GroupsList from '@/components/groups/GroupsList'
import { parseError } from '~/utils/error'
export default {
  components: { GroupsList, GroupDetail },
  props: { opportunity: { type: Object, required: true } },
  data() {
    return { step: 0, errorMsg: null, isLoading: false }
  },
  computed: {
    curGroup() {
      return this.$store.getters['groups/curGroup']
    },
    // Only groups which havent applied to the current opportunity
    filteredGroups() {
      return this.$store.getters['groups/groups'].filter(
        (group) =>
          group.opportunities.findIndex(
            (opportunity) => opportunity === this.$props.opportunity.id
          ) === -1
      )
    },
  },
  async created() {
    this.errorMsg = null
    try {
      this.$store.dispatch('groups/resetList')
      await this.$store.dispatch('groups/fetchGroups')
    } catch (e) {
      this.errorMsg = parseError(e)
    }
  },
  methods: {
    async setStep(step, group) {
      this.errorMsg = null
      try {
        if (step === 1) {
          this.isLoading = true
          await this.$store.dispatch('groups/fetchGroup', group._id)
        }
        this.step = step
      } catch (e) {
        this.errorMsg = parseError(e)
      }
      this.isLoading = false
    },
    async applyWithGroup() {
      try {
        const group = await this.$axios.$post('groups/opportunity', {
          groupId: this.curGroup._id,
          opportunityId: this.$props.opportunity.id,
        })
        await this.$store.dispatch('groups/addGroup', group._id)
        this.$router.push(`groups/${group._id}`)
      } catch (e) {
        this.errorMsg = parseError(e)
      }
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  @include modal;
  @include error;

  &__button {
    @include button;
  }

  &__header {
    display: flex;
    align-items: center;
  }

  &__main {
    height: 35rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  &__icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  &__list {
    width: 100%;
  }

  &__text {
    margin: 0.3rem 0;
  }

  &__title {
    display: flex;
    &--container {
      display: flex;
      align-items: center;
    }
  }
}
</style>
