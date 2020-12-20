export default {
  addGroup(state, data) {
    const curGroupIndex = state.groups.findIndex(
      (group) => group._id === data._id
    )
    const groups = [...state.groups]
    if (curGroupIndex !== -1) {
      groups[curGroupIndex] = data
    } else {
      groups.push(data)
    }
    state.groups = groups
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
