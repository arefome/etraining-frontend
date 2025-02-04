import api from './axios';
import type { User } from '../types';

export const fetchUsers = async () => {
  const { data } = await api.get('users');
  return data;
};

export const createUser = async (user: User) => {
  await api.post('users', user);
};

export const updateUser = async (id: string, user: User) => {
  await api.patch(`users/${id}`, user);
};

export const deleteUser = async (id: string) => {
  await api.delete(`users/${id}`);
};

export const fetchRoles = async () => {
  const { data } = await api.get('users/roles');
  return data;
};
