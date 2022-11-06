import { defineStore } from 'pinia';
import router from '@/router';

import { UserService } from '@/services/user';
import Session from "@/utils/session"

const userService: UserService = new UserService()

export const useUserStore = defineStore('user', {
  state: () => ({
    users: {},
    data: null || Session.getJWTData(),
  }),

  actions: {
    async checkAuthorizationToken(): Promise<{ isAuthenticated: boolean, message?: string }> {
      const token = Session.getToken()

      if (!token) {
        return { isAuthenticated: false, message: 'Missing Token' }
      }

      const isAuthenticated: boolean = await userService.validateJwt()
        .then((data: any) => {
          this.data = data
          data.isAuthenticated = true
          Session.setJWTData(data)
          return true
        })
        .catch(() => false)

      return { isAuthenticated }
    },

    async login(email: string, password: string) {
      const user = await userService.login(email, password)
        .then((data: any) => {
          this.data = data.user
          data.user.isAuthenticated = true
          Session.setJWTData(data.user)
          Session.setToken(data.token)
        })
      router.push({name: 'dashboard'});
    },
    logout() {
      this.data = null;
      Session.clear()
      router.push({name: 'login'});
    }
  }
});
