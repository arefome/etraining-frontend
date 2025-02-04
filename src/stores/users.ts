import { defineStore } from 'pinia';

import { createUser, updateUser, deleteUser, fetchUsers } from '../api/users';
import type { User } from '../types';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
  }),
  actions: {
    async loadUsers() {
      this.users = await fetchUsers();
    },
    async addUser(user: User) {
      await createUser(user);
      this.loadUsers();
    },
    async editUser(id: string, user: User) {
      await updateUser(id, user);
      this.loadUsers();
    },
    async removeUser(id: string) {
      await deleteUser(id);
      this.loadUsers();
    },
  },
});