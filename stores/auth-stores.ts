import { create } from 'zustand';

type AuthState = {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  booted: boolean;

  setSession: (token: string, user: any) => void;
  clearSession: () => void;
  setBooted: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  booted: false,

  setSession: (token, user) =>
    set({
      token,
      user,
      isAuthenticated: true,
      booted: true,
    }),

  clearSession: () =>
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      booted: true,
    }),

  setBooted: () => set({ booted: true }),
}));
