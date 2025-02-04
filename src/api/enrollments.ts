import api from './axios';
import type { UserCourse } from '../types';

export const fetchEnrollments = async () => {
  const { data } = await api.get('enrollments');
  return data;
};

export const createEnrollment = async (enrollment: UserCourse) => {
  await api.post('enrollments', enrollment);
};

export const updateEnrollment = async (id: string, enrollment: UserCourse) => {
  await api.put(`enrollments/${id}`, enrollment);
};

export const deleteEnrollment = async (id: string) => {
  await api.delete(`enrollments/${id}`);
};