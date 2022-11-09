import { defineStore } from 'pinia';
import router from '@/router';

import { UserService } from '@/services/user';
import Session from "@/utils/session"

import { UserInterface } from '@/interfaces/UserInterface';

import { useResetStore } from '@/utils/useResetStore'

const userService: UserService = new UserService()

interface State {
  currentUser: UserInterface | null
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    currentUser: null || Session.getJWTData(),
  }),

  actions: {
    async checkAuthorizationToken(): Promise<{ isAuthenticated: boolean, message?: string }> {
      const token = Session.getToken()

      if (!token) {
        return { isAuthenticated: false, message: 'Missing Token' }
      }

      const isAuthenticated: boolean = await userService.validateJwt()
        .then((user: any) => {
          this.currentUser = user
          user.isAuthenticated = true
          Session.setJWTData(user)
          return true
        })
        .catch(() => false)

      return { isAuthenticated }
    },

    async login(email: string, password: string) {
      const user = await userService.login(email, password)
        .then((currentUser: any) => {
          this.currentUser = currentUser.user
          currentUser.user.isAuthenticated = true
          Session.setJWTData(currentUser.user)
          Session.setToken(currentUser.token)
        })
      router.push({name: 'dashboard-events'});
    },
    logout() {
      Session.clear()
      const resetStore = useResetStore()
      resetStore.all()
      router.push({name: 'login'});
    }
  }
});
