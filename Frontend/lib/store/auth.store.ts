import { create } from "zustand";
import { AuthState } from "../types";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  tokenExpiry: 0,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setTokenExpiry: (value) => set({ tokenExpiry: value }),
  logout: () => set({ isAuthenticated: false, tokenExpiry: 0 }),
}));
