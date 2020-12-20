export default {
  addOpportunity({ commit }, data) {
    commit('addOpportunity', data)
  },
  addOpportunities({ commit }, data) {
    commit('addOpportunities', data)
  },
  // Search opportunities in a pagginated way
  async fetchOpportunities(context) {
    const role = context.getters.role
    let roleQuery = {}
    if (role) {
      roleQuery = { role }
    }
    const opportunities = await this.$axios.$get(`opportunities`, {
      params: { page: context.getters.nextPage, ...roleQuery },
    })
    context.dispatch('addOpportunities', opportunities)
    return opportunities
  },
  incrementNextPage({ commit }) {
    commit('incrementNextPage')
  },
  resetNextPage({ commit }) {
    commit('resetNextPage')
  },
  // Reset opportunities and next page
  resetList({ commit }) {
    commit('setOpportunities', [])
    commit('resetNextPage')
  },
  setRole({ commit, dispatch }, data) {
    dispatch('resetList')
    commit('setRole', data)
  },
  setOpportunities({ commit }, data) {
    commit('setOpportunities', data)
  },
}
export const strict = false
