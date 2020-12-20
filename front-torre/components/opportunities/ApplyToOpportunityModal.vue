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
          class="modal__list"
          @groupClicked="setStep(1, $event)"
        ></GroupsList>
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
        <GroupDetail :error-msg="errorMsg" :group="curGroup"></GroupDetail>
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
    return { step: 0, errorMsg: null }
  },
  computed: {
    curGroup() {
      return this.$store.getters['groups/curGroup']
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
      try {
        if (step === 1) {
          await this.$store.dispatch('groups/fetchGroup', group._id)
        }
        this.step = step
      } catch (e) {
        this.errorMsg = parseError(e)
      }
    },
    applyWithGroup() {},
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  @include modal;

  &__button {
    @include button;
  }

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
