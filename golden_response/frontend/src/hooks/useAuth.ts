import { useEffect, useState } from 'react';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';

export const useAuthBootstrap = () => {
  const { token, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) return;
    authService
      .me()
      .then(setUser)
      .catch(logout)
      .finally(() => setLoading(false));
  }, [token, setUser, logout]);

  return { loading };
};
