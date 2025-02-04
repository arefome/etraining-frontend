import { defineStore } from 'pinia';
import { login, verify } from '../api/auth';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    verificationToken: null,
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email: string) {
      try {
        const { verification_token } = await login(email);
        this.verificationToken = verification_token;
        localStorage.setItem('verificationToken', verification_token);
        return true;
      } catch (error) {
        return false;
      }
    },
    async verify() {
      if (!this.verificationToken) return;
      const { access_token, user } = await verify(this.verificationToken);
      this.token = access_token;
      this.user = user;
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.removeItem('verificationToken');
      this.verificationToken = null;
      router.push('/');
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
    }
  }
});
