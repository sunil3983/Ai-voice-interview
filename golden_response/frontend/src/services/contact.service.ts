import { api } from './api';

export const contactService = {
  async submit(payload: { name: string; email: string; subject: string; message: string }) {
    const { data } = await api.post<{ message: string }>('/contact', payload);
    return data.message;
  }
};
