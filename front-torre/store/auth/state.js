export default () => ({
  username: '', // Email del usuario
  tokenData: {}, // Información del token, principalmente idToken y accessToken
  isAuth: false, // Si el usuario se encuentra autenticado o no
  timeoutRefreshToken: null, // Timeout para refrescar el token, se guarda para poderse cancelar de ser necesario
  rememberMe: true, // Indica si el usuario le dió a "Recuerdame" en el login, si es false no se carga la info del token del localStorage
})
