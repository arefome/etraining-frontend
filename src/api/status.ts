import api from './axios';

export const fetchInscriptionStatus = async () => {
  const { data } = await api.get('courses/inscription-status');
  return data;
};