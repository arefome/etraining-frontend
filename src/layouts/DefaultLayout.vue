<template>
    <div>
      <header class="bg-gray-800 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold">Mi App de Cursos</h1>
          <nav>
            <router-link to="/dashboard" class="mr-4">Dashboard</router-link>
            <router-link to="/courses" class="mr-4">Cursos</router-link>
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
  import { useAuthStore } from '@/store/auth';
  const authStore = useAuthStore();
  const logout = () => {
    authStore.logout();
    window.location.href = '/login';
  };
  </script>
  