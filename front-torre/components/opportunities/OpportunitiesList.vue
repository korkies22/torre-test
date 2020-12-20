<template>
  <div class="opportunitiesList">
    <ApplyToOpportunityModal
      v-if="isModalVisible"
      :opportunity="selectedOpportunity"
      @close="closeModal"
    />
    <div class="opportunitiesList__cards">
      <OpportunityCard
        v-for="(opportunity, index) in opportunities"
        :key="index"
        :index="index"
        :opportunity="opportunity"
        :appliable="true"
        @applyToOpportunity="openModal(opportunity)"
      >
      </OpportunityCard>
    </div>

    <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
      <div slot="spinner"><div class="loadingSpinner"></div></div>
      <div slot="error" slot-scope="{ trigger }" style="margin: 1rem 0">
        There has been an error.
        <a href="javascript:;" @click="trigger">Click</a> to try again
      </div>
      <div slot="no-more" style="margin: 1rem 0">
        No more opportunities at the moment
      </div>
      <div slot="no-results" style="margin: 1rem 0">
        At the moment there are not opportunities matching your dream job in the
        system
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import ApplyToOpportunityModal from '@/components/opportunities/ApplyToOpportunityModal'
import OpportunityCard from '@/components/opportunities/OpportunityCard'
import { mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
export default {
  components: {
    InfiniteLoading,
    OpportunityCard,
    ApplyToOpportunityModal,
  },
  data() {
    return {
      errorMsg: null,
      selectedOpportunity: null,
      isModalVisible: false,
    }
  },
  computed: {
    ...mapGetters({
      opportunities: 'opportunities/allOpportunities',
      role: 'opportunities/role',
    }),
  },
  watch: {
    role(newRole, oldRole) {
      if (this.$refs.infiniteLoading) {
        this.$store.dispatch('opportunities/resetNextPage')
        this.$refs.infiniteLoading.stateChanger.reset()
      }
    },
  },
  // I made this reload intentional so that the user always has the latest opportunities
  mounted() {
    this.$store.dispatch('opportunities/resetList')
  },
  methods: {
    openModal(opportunity) {
      this.selectedOpportunity = opportunity
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    },
    async infiniteHandler($state) {
      try {
        const opportunities = await this.$store.dispatch(
          'opportunities/fetchOpportunities'
        )
        if (opportunities.length && opportunities.length > 0) {
          this.$store.dispatch('opportunities/incrementNextPage')
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.error()
      }
    },
  },
}
</script>
