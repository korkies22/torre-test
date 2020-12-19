// Redirects child in case of nav
export default function ({ route, redirect }) {
  if (route.fullPath === '/') {
    return redirect('/groups')
  }
}
