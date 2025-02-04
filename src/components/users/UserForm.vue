<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import { fetchRoles } from '../../api/users';
import { fetchCourses } from '../../api/courses';

interface UserData {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    role_id: string;
    courses: Object[];
}

const props = defineProps<{
    modelValue?: UserData;
}>();

const emits = defineEmits<{
    (e: 'submit', user: UserData): void;
}>();

const form = ref<UserData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role_id: '',
    courses: []
});

const roles = ref<any[]>([]);
const courses = ref<any[]>([]);


onMounted(async () => {
    roles.value = await fetchRoles();
    courses.value = await fetchCourses();
    if (props.modelValue) {
        form.value = { 
            first_name: props.modelValue.first_name,
            last_name: props.modelValue.last_name,
            email: props.modelValue.email,
            phone: props.modelValue.phone,
            role_id: props.modelValue.role_id,
            courses: props.modelValue.courses
         };
    }
});

const onSubmit = () => {
    emits('submit', { ...form.value });
};
</script>

<template>
    <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
            <label class="block text-sm font-medium">Nombre</label>
            <input v-model="form.first_name" type="text" class="mt-1 block w-full border rounded p-2" required />
        </div>
        <div>
            <label class="block text-sm font-medium">Apellido</label>
            <input v-model="form.last_name" type="text" class="mt-1 block w-full border rounded p-2" required />
        </div>
        <div>
            <label class="block text-sm font-medium">Email</label>
            <input v-model="form.email" type="email" class="mt-1 block w-full border rounded p-2" required />
        </div>
        <div>
            <label class="block text-sm font-medium">Teléfono</label>
            <input v-model="form.phone" type="text" class="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
            <label class="block text-sm font-medium">Rol</label>
            <select v-model="form.role_id" class="mt-1 block w-full border rounded p-2" required>
                <option value="" disabled>Seleccione un rol</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name }}
                </option>
            </select>
        </div>
        <!-- courses  -->
            <div>
                <label class="block text-sm font-medium">Cursos</label>
                <select v-model="form.courses" class="mt-1 block w-full border rounded p-2" multiple required>
                    <option value="" disabled>Seleccione cursos</option>
                    <option v-for="course in courses" :key="course.id" :value="course.id"
                    >
                        {{ course.name }}
                    </option>
                </select>
            </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
            Guardar
        </button>
    </form>
</template>