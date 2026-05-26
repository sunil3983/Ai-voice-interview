import { api } from './api';
import type { User } from '../types';

export const authService = {
  async register(payload: { name: string; email: string; password: string }) {
    const { data } = await api.post<{ data: { token: string; user: User } }>('/auth/register', payload);
    return data.data;
  },
  async login(payload: { email: string; password: string }) {
    const { data } = await api.post<{ data: { token: string; user: User } }>('/auth/login', payload);
    return data.data;
  },
  async me() {
    const { data } = await api.get<{ data: User }>('/auth/me');
    return data.data;
  }
};
