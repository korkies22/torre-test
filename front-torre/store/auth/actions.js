// Esta función recibe en data la información de un token, la persiste en el localStorage y programa que en 55 minutos se refresque el token
const handleTokenResp = (data, commit, dispatch, axios, getters) => {
  // Configura el módulo de axios para que el token se utilice en todas las peticiones
  axios.setToken(data.token)

  localStorage.setItem('tokenData', JSON.stringify(data))
  localStorage.setItem('rememberMe', getters.rememberMe)
  /** El tokenTimeout se guarda como 55 minutos a partir de ahora para que se tenga esos 5 minutos de rango 
   en los cuales hacer un refresh antes que el token deje de ser inválido */
  localStorage.setItem(
    'tokenTimeout',
    new Date(new Date().getTime() + 55 * 60 * 1000)
  )
  localStorage.setItem('username', getters.username)

  // Guarda la info de un usuario en el store
  commit('login', data)
  // En 55 minutos se hace un refreshToken
  const timeout = setTimeout(
    () => refreshData(commit, dispatch, axios, getters),
    55 * 60 * 1000
  )
  // Se guarda este timeout para cancelarlo en caso de cerrar sesión
  commit('setTimeoutRefresh', timeout)
}

// Esta función hace un llamado a refreshToken y luego persiste la información con handleTokenResp
const refreshData = (
  commit,
  dispatch,
  axios,
  getters,
  username,
  refreshToken
) => {
  return axios
    .$post(`auth/refreshToken`, {
      username: username || getters.username,
      refreshToken: refreshToken || getters.tokenData.refreshToken,
    })
    .then((refreshedData) => {
      // Se persiste la información
      handleTokenResp(refreshedData, commit, dispatch, axios, getters)
    })
    .catch((e) => {
      // En caso de error, logout
      dispatch('logout')
    })
}

export default {
  setUsername({ commit }, data) {
    commit('setUsername', data)
  },
  // Esta función se encarga de buscar si un usuario está logueado con sus datos persistidos en el localStorage
  initAuth({ commit, dispatch, getters }) {
    let tokenData = localStorage.getItem('tokenData')
    let rememberMe = localStorage.getItem('rememberMe')
    rememberMe = rememberMe === 'true' || rememberMe === true
    commit('setRememberMe', rememberMe)

    // Si no hay datos o ya se encontraba autenticado, return
    if (!tokenData || getters.isAuth) {
      return
    }
    tokenData = JSON.parse(tokenData)
    const tokenTimeout = localStorage.getItem('tokenTimeout')

    const username = localStorage.getItem('username')
    const expirationDate = +new Date(tokenTimeout)
    const timeDiff = expirationDate - new Date().getTime()

    // Si al iniciar sesión no puso "recuerdame", return
    if (!rememberMe) return

    commit('setUsername', username)
    // Mira si el token ya expiró. Se indica que expira faltando 5 minutos para su verdadera expiración (revisar handleTokenResp)
    if (!tokenTimeout || timeDiff <= 0) {
      // Si expiró hace un refreshToken
      return refreshData(
        commit,
        dispatch,
        this.$axios,
        getters,
        username,
        tokenData.refreshToken
      )
    }
    // Configura el módulo de axios para utiliza el token en cada petición
    this.$axios.setToken(tokenData.token)
    commit('login', tokenData)
    /** Si el token no expiró, entonces se configura el timeout como el tiempo restante.
     * Recordar que este timeout se guardó como 5 minutos antes que el token expire */

    const timeout = setTimeout(
      () => refreshData(commit, dispatch, this.$axios, getters),
      timeDiff
    )
    commit('setTimeoutRefresh', timeout)
  },
  login({ commit, dispatch, getters }, data) {
    handleTokenResp(data, commit, dispatch, this.$axios, getters)
  },
  // Al hacer logout se limpia el timeout de refreshToken, se deja de enviar en cada petición y se eliminan los datos del localStorage
  logout({ commit, getters }) {
    clearTimeout(getters.timeoutRefreshToken)
    this.$axios.setToken(false)
    commit('setTimeoutRefresh', null)
    commit('logout')
    localStorage.removeItem('tokenData')
    localStorage.removeItem('tokenTimeout')
    localStorage.removeItem('username')
  },
}
