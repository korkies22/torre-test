export default {
  addGroup(state, data) {
    state.groups.push(data)
  },
  addGroups(state, data) {
    state.groups = state.groups.concat(data)
  },
  setGroups(state, data) {
    state.groups = data
  },
  setCurGroup(state, data) {
    state.curGroup = data
  },
}
