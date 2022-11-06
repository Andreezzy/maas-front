import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import isAuthenticatedGuard from './auth-guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import("@/views/DashboardView.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes
});

router.beforeEach(isAuthenticatedGuard)

export default router