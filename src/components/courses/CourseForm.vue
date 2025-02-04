<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import { fetchCategories } from '@/api/categories'; // API para obtener categorías
import { fetchModalities } from '@/api/modalities';   // API para obtener modalidades

interface CourseData {
  name: string;
  category_id: string;
  modality_id: string;
  duration: number;
  quota: number;
}

const props = defineProps<{
  modelValue?: CourseData;
}>();

const emits = defineEmits<{
  (e: 'submit', course: CourseData): void;
}>();

const form = ref<CourseData>({
  name: '',
  category_id: '',
  modality_id: '',
  duration: 0,
  quota: 0,
});

const categories = ref<any[]>([]);
const modalities = ref<any[]>([]);

const loadDependencies = async () => {
  // Asumiendo que tienes endpoints para categorías y modalidades
  categories.value = await fetchCategories();
  modalities.value = await fetchModalities();
};

onMounted(() => {
  loadDependencies();
  if (props.modelValue) {
    form.value = { ...props.modelValue };
  }
});

const onSubmit = () => {
  // Aquí podrías agregar validación antes de emitir el formulario
  emits('submit', { ...form.value });
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium">Nombre</label>
      <input
        v-model="form.name"
        type="text"
        class="mt-1 block w-full border rounded p-2"
        placeholder="Nombre del curso"
        required
      />
    </div>
    <div>
      <label class="block text-sm font-medium">Categoría</label>
      <select v-model="form.category_id" class="mt-1 block w-full border rounded p-2" required>
        <option value="" disabled>Seleccione una categoría</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium">Modalidad</label>
      <select v-model="form.modality_id" class="mt-1 block w-full border rounded p-2" required>
        <option value="" disabled>Seleccione una modalidad</option>
        <option v-for="mod in modalities" :key="mod.id" :value="mod.id">
          {{ mod.name }}
        </option>
      </select>
    </div>
    <div class="flex space-x-4">
      <div class="w-1/2">
        <label class="block text-sm font-medium">Duración (horas)</label>
        <input v-model.number="form.duration" type="number" min="1" class="mt-1 block w-full border rounded p-2" required />
      </div>
      <div class="w-1/2">
        <label class="block text-sm font-medium">Cupo</label>
        <input v-model.number="form.quota" type="number" min="1" class="mt-1 block w-full border rounded p-2" required />
      </div>
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      Guardar
    </button>
  </form>
</template>

<style scoped>
/* Personaliza estilos adicionales si es necesario */
</style>
