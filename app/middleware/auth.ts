export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()

  // List of protected routes
  const protectedRoutes = [
    '/dashboard',
    '/games/new',
    '/games/edit',
    '/mechanics',
    '/systems',
    '/families',
    '/honors'
  ]

  // Check if the current route or any parent route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    to.path.startsWith(route)
  )

  // Also protect individual game edit pages
  const isGameEditRoute = /^\/games\/[^/]+\/edit$/.test(to.path)

  // If trying to access a protected route without authentication
  if ((isProtectedRoute || isGameEditRoute) && !user.value) {
    // Store the intended destination
    const redirectTo = to.fullPath

    // Redirect to login with the intended destination as a query parameter
    return navigateTo({
      path: '/login',
      query: {
        redirect: redirectTo !== '/dashboard' ? redirectTo : undefined
      }
    })
  }
})
