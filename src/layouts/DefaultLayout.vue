<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const isProd = computed(() => import.meta.env.VITE_NODE_ENV === 'production');
const isMobileMenuOpen = ref(false);

const logout = () => {
  authStore.logout();
  router.push('/login');
};

const navItems = [
  { name: 'Cursos', path: '/courses' },
  { name: 'Usuarios', path: '/users'},
];
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header :class="[
      'transition-colors duration-300 ease-in-out',
      isProd ? 'bg-gray-800' : 'bg-gray-500'
    ]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <h1 class="text-white text-xl font-bold">Etraining CRUD</h1>
            <span :class="[
              'ml-2 px-2 py-1 text-xs font-medium rounded-full',
              isProd ? 'bg-green-500' : 'bg-yellow-500'
            ]">
              {{ isProd ? 'PROD' : 'DEV' }}
            </span>
          </div>
          <nav class="hidden md:flex space-x-4" v-if="authStore.isAuthenticated">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path" 
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              {{ item.name }}
            </router-link>
            <button @click="logout" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <LogOut class="w-4 h-4 mr-2" />
              Salir
            </button>
          </nav>
          <div class="md:hidden flex items-center">
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-gray-300 hover:text-white">
              <Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
              <X v-else class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <div v-if="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path" 
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
          <button @click="logout" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center">
            <LogOut class="w-4 h-4 mr-2" />
            Salir
          </button>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>

    <footer class="bg-gray-100">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500 text-sm">
          {{ new Date().getFullYear() }} Etraining CRUD.
        </p>
      </div>
    </footer>
  </div>
</template>