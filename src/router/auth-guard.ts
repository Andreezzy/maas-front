import { RouteLocationNormalized } from "vue-router"
import { useUserStore } from '@/stores/user'
import Session from "@/utils/session"

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: (route?: { name?: string, query?: object, path?: string }) => void
) => {
  const user = useUserStore()

  let isAuthenticated = false

  if (!Session.getJWTData().isAuthenticated) {
    const response = await user.checkAuthorizationToken()
    isAuthenticated = response.isAuthenticated
  } else {
    isAuthenticated = await Session.getJWTData().isAuthenticated
  }

  if (!isAuthenticated && to.name !== 'login') {
    Session.clear()
    next({name: 'login'})
    return
  }

  if(isAuthenticated && to.name == 'login') {
    next({name: 'root'})
    return
  }
  next()
}

export default isAuthenticatedGuard