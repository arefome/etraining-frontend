<template>
    <div>
      <header :class="prod ? 'bg-gray-800 text-white p-4' : 'bg-gray-500 text-white p-4'">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold">Etraining CRUD</h1>
          <nav v-if="authStore.isAuthenticated">
            <router-link to="/courses" class="mr-4">Cursos</router-link>
            <router-link to="/users" class="mr-4">Usuarios</router-link>
            <button @click="logout" class="underline">Salir</button>
          </nav>
        </div>
      </header>
      <main class="container mx-auto p-4">
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '../stores/auth';
  const authStore = useAuthStore();
  const prod = import.meta.env.MODE === 'production';
  const logout = () => {
    authStore.logout();
    window.location.href = '/login';
  };
  </script>
  