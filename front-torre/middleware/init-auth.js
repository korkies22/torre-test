// Loads info from localStorage if present in order to login
export default function ({ store }) {
  return store.dispatch('auth/initAuth')
}
