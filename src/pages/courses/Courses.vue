<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCoursesStore } from '../../stores/courses';
import CourseForm from '../../components/courses/CourseForm.vue';

const coursesStore = useCoursesStore();

const showFormModal = ref(false);
const editingCourse = ref<null | any>(null);

const openNewCourseForm = () => {
  editingCourse.value = null;
  showFormModal.value = true;
};

const openEditCourseForm = (course: any) => {
  editingCourse.value = { ...course };
  showFormModal.value = true;
};

const onSubmitCourse = async (courseData: any) => {
  try {
    if (editingCourse.value) {
      await coursesStore.editCourse(editingCourse.value.id, courseData);
    } else {
      await coursesStore.addCourse(courseData);
    }
    showFormModal.value = false;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  coursesStore.loadCourses();
});
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Gestión de Cursos</h2>
      <button @click="openNewCourseForm" class="bg-green-500 text-white px-4 py-2 rounded">
        Nuevo Curso
      </button>
    </div>
    <ul class="space-y-2">
      <li
        v-for="course in coursesStore.courses"
        :key="course.id"
        class="flex justify-between items-center border p-4 rounded"
      >
        <div>
          <h3 class="text-xl">{{ course.name }}</h3>
          <p class="text-sm">Categoría: {{ course.category?.name }} | Modalidad: {{ course.modality?.name }}</p>
          <p class="text-sm">Duración: {{ course.duration }}h | Cupo: {{ course.quota }}</p>
        </div>
        <div class="flex space-x-2">
          <button @click="openEditCourseForm(course)" class="bg-blue-500 text-white px-3 py-1 rounded">
            Editar
          </button>
          <button @click="coursesStore.removeCourse(course.id)" class="bg-red-500 text-white px-3 py-1 rounded">
            Eliminar
          </button>
        </div>
      </li>
    </ul>

    <div
      v-if="showFormModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div class="bg-white p-6 rounded w-full max-w-md">
        <h2 class="text-xl mb-4">
          {{ editingCourse ? 'Editar Curso' : 'Nuevo Curso' }}
        </h2>
        <CourseForm :modelValue="editingCourse" @submit="onSubmitCourse" />
        <button @click="showFormModal = false" class="mt-4 text-gray-500 underline">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>
