import { create } from "zustand";
import { AuthState } from "../types";

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    email: null,
    role: "user",
  },
  session: {
    tokenExpiry: 0,
    tokenWarning: 0,
  },

  setUserState: (email, role) => set({ user: { email, role } }),
  setSessionState: (te, tw) =>
    set({ session: { tokenExpiry: te, tokenWarning: tw } }),
  logout: () =>
    set({
      user: { email: null, role: "user" },
      session: { tokenExpiry: 0, tokenWarning: 0 },
    }),
}));
