<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { toast } from 'vue3-toastify'


const authStore = useAuthStore();

const email = ref('test@gmail.com');
const success = ref(false);
const error = ref('');
const isLoading = ref(false);

const login = async () => {
  if (!email.value) {
    error.value = 'Por favor, ingrese su correo electrónico.';
    toast.error(error.value)
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    success.value = await authStore.login(email.value);
    if (!success.value) {
      error.value = 'Correo electrónico no reconocido.';
      toast.error(error.value)
    }
  } catch (e) {
    error.value = 'Ocurrió un error. Por favor, intente más tarde.';
    toast.error(error.value)
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex-grow flex flex-col justify-center items-center">
    <div class="max-w-md w-full space-y-8">
      <div v-if="!success">
        <h2 class="mt-6 text-center text-3xl font-light text-gray-900">
          Iniciar Sesión
        </h2>
        <form class="mt-8 space-y-6" @submit.prevent="login">
          <div>
            <label for="email-address" class="sr-only">Correo electrónico</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              </div>
              <input
                id="email-address"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              {{ isLoading ? 'Cargando...' : 'Ingresar' }}
            </button>
          </div>
        </form>
      </div>

      <div v-else class="text-center">
        <h2 class="text-2xl font-light mb-4">Confirme su correo electrónico</h2>
        <button
          @click="authStore.verify"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>