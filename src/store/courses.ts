import { defineStore } from 'pinia';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '@/api/courses';
import type { Course } from '@/types';

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [] as Course[],
  }),
  getters: {
    totalCourses: (state) => state.courses.length,
  },
  actions: {
    async loadCourses() {
      this.courses = await fetchCourses();
    },
    async addCourse(course: Course) {
      await createCourse(course);
      await this.loadCourses();
    },
    async editCourse(id: string, course: Course) {
      await updateCourse(id, course);
      await this.loadCourses();
    },
    async removeCourse(id: string) {
      await deleteCourse(id);
      await this.loadCourses();
    }
  }
});
