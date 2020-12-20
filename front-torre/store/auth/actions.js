// This function receives in data the token info, it stores the info in localStorage and programs 55 minutes for token refreshing
const handleTokenResp = (data, commit, dispatch, axios, getters) => {
  // Axios module is configured so that the token is used in every request
  axios.setToken(data.token)

  localStorage.setItem('token', data.token)
  localStorage.setItem('refreshToken', data.refreshToken)
  localStorage.setItem('rememberMe', getters.rememberMe)
  localStorage.setItem('username', data.username)
  localStorage.setItem('user', JSON.stringify(data.user))
  /** tokenTimeout sets 55 minutes from now so that there are 5 minutes left in where a
   * request is made before the current token is invalidated */
  localStorage.setItem(
    'tokenTimeout',
    new Date(new Date().getTime() + 55 * 60 * 1000)
  )

  // Stores user info in storage
  commit('login', data)
  // In 55 minutes the token gets refreshed
  const timeout = setTimeout(
    () => refreshData(commit, dispatch, axios, getters),
    55 * 60 * 1000
  )
  // This timeout gets saved so it can be cancelled later
  commit('setTimeoutRefresh', timeout)
}

// This function calls refreshToken in backend an persist info with handleTokenResp
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
      refreshToken: refreshToken || getters.refreshToken,
    })
    .then((refreshedData) => {
      // Info gets persisted
      handleTokenResp(refreshedData, commit, dispatch, axios, getters)
    })
    .catch((e) => {
      // In case of error, logout
      dispatch('logout')
    })
}

export default {
  setUsername({ commit }, data) {
    commit('setUsername', data)
  },
  // This functions search user info in localStorage
  initAuth({ commit, dispatch, getters }) {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    let rememberMe = localStorage.getItem('rememberMe')
    rememberMe = rememberMe === 'true' || rememberMe === true
    commit('setRememberMe', rememberMe)

    // If no data or user was already auth, return
    if (!token || getters.isAuth) {
      return
    }
    const tokenTimeout = localStorage.getItem('tokenTimeout')
    const user = JSON.parse(localStorage.getItem('user'))

    const username = localStorage.getItem('username')
    const expirationDate = +new Date(tokenTimeout)
    const timeDiff = expirationDate - new Date().getTime()

    // If "remember me" is not set, return
    if (!rememberMe) return

    commit('setUsername', username)
    // Checks if token expired. Expiration time set to 55 minutes (check handleTokenResp)
    if (!tokenTimeout || timeDiff <= 0) {
      // If expired, tries to refreshToken
      return refreshData(
        commit,
        dispatch,
        this.$axios,
        getters,
        username,
        refreshToken
      )
    }
    // Axios module gets configured to use token
    this.$axios.setToken(token)
    commit('login', { token, refreshToken, user })
    /** If token isn't expired, then timeout is the time left.
     * Remember that this initial timeout was set to 5 minutes before the first hour of token validity */

    const timeout = setTimeout(
      () => refreshData(commit, dispatch, this.$axios, getters),
      timeDiff
    )
    commit('setTimeoutRefresh', timeout)
  },
  login({ commit, dispatch, getters }, data) {
    commit('setUsername', data.username)
    handleTokenResp(data, commit, dispatch, this.$axios, getters)
  },
  // At logout refreshToken timeout is cleared, token is also removed from axios requests and localStorage is removed too
  logout({ commit, getters }) {
    clearTimeout(getters.timeoutRefreshToken)
    this.$axios.setToken(false)
    commit('setTimeoutRefresh', null)
    commit('logout')
    localStorage.removeItem('token')
    localStorage.removeItem('tokenTimeout')
    localStorage.removeItem('username')
    localStorage.removeItem('user')
  },
}
