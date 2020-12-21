export default {
  // Save a group in the Store
  addGroup({ commit }, data) {
    commit('addGroup', data)
  },
  // Fetch groups
  async fetchGroups(context) {
    const groups = await this.$axios.$get(`groups`)
    context.commit('setGroups', groups)
    return groups
  },
  // Fetch a single group given its id
  async fetchGroup(context, id) {
    const group = await this.$axios.$get(`groups/${id}`)
    context.commit('setCurGroup', group)
    return group
  },
  setCurGroup({ commit }, data) {
    commit('setCurGroup', data)
  },
  setGroups({ commit }, data) {
    commit('setGroups', data)
  },
  resetList({ commit }) {
    commit('setGroups', [])
  },
}
