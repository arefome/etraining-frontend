import api from './axios';
import type { Course } from '../types';

export const fetchCourses = async () => {
  const { data } = await api.get('courses');
  return data;
};

export const getCourse = async (id: string) => {
  const { data } = await api.get(`courses/${id}`);
  return data;
};

export const createCourse = async (course: Course) => {
  await api.post('courses', course);
};

export const updateCourse = async (id: string, course: Course) => {
  await api.patch(`courses/${id}`, course);
};

export const deleteCourse = async (id: string) => {
  await api.delete(`courses/${id}`);
};
