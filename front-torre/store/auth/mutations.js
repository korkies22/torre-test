export default {
  setUsername(state, data) {
    state.username = data
  },
  // Aquí se incluyen los datos del usuario y de autenticación generales, se elimina el rol porque este se guarda en otra mutación
  login(state, data) {
    delete data.role
    state.tokenData = data
    state.isAuth = true
  },
  // En logout se limpian los datos
  logout(state) {
    state.tokenData = {}
    state.username = null
    state.isAuth = false
  },
  setTimeoutRefresh(state, data) {
    state.timeoutRefreshToken = data
  },
  setRememberMe(state, data) {
    state.rememberMe = data
  },
}
