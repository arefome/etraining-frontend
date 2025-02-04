import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/auth/Login.vue';
import Dashboard from '@/pages/dashboard/Dashboard.vue';
import Courses from '@/pages/courses/Courses.vue';
import { useAuthStore } from '@/store/auth';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login },
  { 
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/courses',
    component: Courses,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware para proteger rutas autenticadas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
