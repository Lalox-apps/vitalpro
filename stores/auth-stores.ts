import { create } from 'zustand';

export type User = {
  id: string;
  email: string;
  name: string | null;
  role: 'USER' | 'ADMIN';
};

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  setSession: (token, user) =>
    set({
      token,
      user,
      isAuthenticated: true,
    }),

  clearSession: () =>
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    }),
}));
