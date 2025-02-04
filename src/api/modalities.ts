import api from './axios';

export const fetchModalities = async () => {
  const { data } = await api.get('courses/modalities');
  return data;
};