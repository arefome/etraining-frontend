<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const login = async () => {
  await authStore.login(email.value, password.value);
  router.push('/dashboard');
};
</script>

<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-xl">Iniciar Sesión</h2>
    <input v-model="email" type="email" placeholder="Email" class="border p-2 w-full" />
    <input v-model="password" type="password" placeholder="Contraseña" class="border p-2 w-full mt-2" />
    <button @click="login" class="bg-blue-500 text-white px-4 py-2 mt-4">Ingresar</button>
  </div>
</template>
