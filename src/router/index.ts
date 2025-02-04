import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/auth/Login.vue';
import Courses from '../pages/courses/Courses.vue';
import Users from '../pages/users/Users.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/', redirect: '/courses' },
  { path: '/login', component: Login, meta: { redirectOnLogin: true } },
  { path: '/courses', component: Courses, meta: { requiresAuth: true } },
  { path: '/users', component: Users, meta: { requiresAuth: true, needRoles: ['admin'] } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.redirectOnLogin && authStore.isAuthenticated) {
    next('/');
  } else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
