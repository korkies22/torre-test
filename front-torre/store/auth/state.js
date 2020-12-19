export default () => ({
  username: '', // Username from user
  token: {}, // Token used to validate the user against the backend
  isAuth: false, // If user is currently auth or not
  timeoutRefreshToken: null, // Timeout for refreshing token, it is stored in order to be cancelled if necessary
  rememberMe: true, // If user set "Remember me" in login, if it is false, then the token is not set to refresh
})
