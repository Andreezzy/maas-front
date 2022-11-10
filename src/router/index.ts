import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import isAuthenticatedGuard from './auth-guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import("@/views/DashboardLayout.vue"),
    children: [
      {
        path: "/dashboard/events",
        name: "dashboard-events",
        component: () => import("@/views/EventView.vue"),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes
});

router.beforeEach(isAuthenticatedGuard)

export default router