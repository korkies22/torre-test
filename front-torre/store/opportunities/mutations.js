export default {
  addOpportunity(state, data) {
    state.opportunities.unshift(data)
  },
  addOpportunities(state, data) {
    state.opportunities = state.opportunities.concat(data)
  },
  removeOpportunity(state, data) {
    const id = data._id || data
    state.opportunities = state.opportunities.filter((opportunity) => {
      return opportunity._id !== id
    })
  },
  incrementNextPage(state) {
    state.nextPage += 1
  },
  resetNextPage(state) {
    state.nextPage = 1
  },
  setRole(state, data) {
    state.role = data
  },
  setOpportunities(state, data) {
    state.opportunities = data
  },
}
