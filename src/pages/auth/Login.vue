<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

const email = ref('');
const success = ref(false);
const error = ref('');

const login = async () => {
  console.log(email.value);
  success.value = await authStore.login(email.value)
  if (!success.value) {
    error.value = 'Email incorrecto';
  }
};
</script>

<template>
  <div class="max-w-md mx-auto" v-if="!success">
    <h2 class="text-xl">Iniciar Sesión</h2>
    <input v-model="email" type="email" placeholder="Email" class="border p-2 w-full" />
    <p class="text-red-500 mt-2">{{ error }}</p>
    <button @click="login" class="bg-blue-500 text-white px-4 py-2 mt-4">Ingresar</button>
  </div>
  <div class="max-w-md mx-auto" v-else>
    <h2 class="text-xl">Presione el botón para confirmar su correo</h2>
    <button @click="authStore.verify" class="bg-blue-500 text-white px-4 py-2 mt-4">Confirmar</button>
  </div>
</template>
