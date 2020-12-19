// Allows to follow if user is auth, if not, redirects to auth
export default function ({ store, redirect }) {
  if (!store.getters['auth/isAuth']) {
    return redirect('/login')
  }
}
