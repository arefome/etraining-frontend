import api from './axios';

export const fetchCourses = async () => {
  const { data } = await api.get('/courses');
  return data;
};

export const createCourse = async (course: any) => {
  await api.post('/courses', course);
};

export const updateCourse = async (id: string, course: any) => {
  await api.put(`/courses/${id}`, course);
};

export const deleteCourse = async (id: string) => {
  await api.delete(`/courses/${id}`);
};
