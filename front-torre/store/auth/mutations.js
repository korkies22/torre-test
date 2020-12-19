export default {
  setUsername(state, data) {
    state.username = data
  },
  // Here data from the user is included
  login(state, data) {
    state.token = data.token
    state.refreshToken = data.refreshToken
    state.user = data.user
    state.isAuth = true
  },
  // At logout data gets cleared
  logout(state) {
    state.token = null
    state.refreshToken = null
    state.username = null
    state.user = null
    state.isAuth = false
  },
  setTimeoutRefresh(state, data) {
    state.timeoutRefreshToken = data
  },
  setRememberMe(state, data) {
    state.rememberMe = data
  },
}
