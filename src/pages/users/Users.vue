<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUsersStore } from '../../stores/users';
import UserForm from '../../components/users/UserForm.vue';
import { toast } from 'vue3-toastify';

const usersStore = useUsersStore();

const showFormModal = ref(false);
const editingUser = ref<null | any>(null);

const openNewUserForm = () => {
  editingUser.value = null;
  showFormModal.value = true;
};

const openEditUserForm = (user: any) => {
  editingUser.value = { ...user };
  showFormModal.value = true;
};

const errorMessage = ref('');

const onSubmitUser = async (userData: any) => {
  try {
    if (editingUser.value) {
      await usersStore.editUser(editingUser.value.id, userData);
      toast.success('Usuario actualizado');
    } else {
      await usersStore.addUser(userData);
      toast.success('Usuario creado');	
    }
    showFormModal.value = false;
  } catch (error) {
    errorMessage.value = 'Error al guardar usuario';
    toast.error(errorMessage.value);
    console.error(error);
  }
};

onMounted(() => {
  usersStore.loadUsers()
});
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Gestión de Usuarios</h2>
      <button @click="openNewUserForm" class="bg-green-500 text-white px-4 py-2 rounded">
        Nuevo Usuario
      </button>
    </div>
    <ul class="space-y-2">
      <li
        v-for="user in usersStore.users"
        :key="user.id"
        class="flex justify-between items-center border p-4 rounded"
      >
        <div>
          <h3 class="text-xl">{{ user.name }}</h3>
          <p class="text-sm">Email: {{ user.email }}</p>
          <p class="text-sm">Rol: {{ user.role?.name }}</p>
        </div>
        <div class="flex space-x-2">
          <button @click="openEditUserForm(user)" class="bg-blue-500 text-white px-3 py-1 rounded">
            Editar
          </button>
          <button @click="usersStore.removeUser(user.id)" class="bg-red-500 text-white px-3 py-1 rounded">
            Eliminar
          </button>
        </div>
      </li>
    </ul>
      <div class="flex justify-center items-center">
        <div class="bg-red-500 text-white px-4 py-2 rounded" v-if="errorMessage">
          {{ errorMessage }}
        </div>
      </div>
    <div
      v-if="showFormModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div class="bg-white p-6 rounded w-full max-w-md">
        <h2 class="text-xl mb-4">
          {{ editingUser ? 'Editar Usuario' : 'Nuevo Usuario' }}
        </h2>
        <UserForm :modelValue="editingUser" @submit="onSubmitUser" />
        <button @click="showFormModal = false" class="mt-4 text-gray-500 underline">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>