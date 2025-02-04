import api from './axios';

export const login = async (email: string) => {
  const { data } = await api.post('/auth/login', { email });
  return data;
};

export const verify = async (token: string) => {
  const { data } = await api.get('/auth/verify', { params: { token } });
  return data;
};