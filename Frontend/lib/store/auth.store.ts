import { create } from "zustand";
import { AuthState } from "../types";

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    fullName: null,
    email: null,
    role: "user",
  },
  session: {
    tokenExpiry: 0,
    tokenWarning: 0,
  },

  setUserState: (fullName, email, role) =>
    set({ user: { fullName, email, role } }),
  setSessionState: (te, tw) =>
    set({ session: { tokenExpiry: te, tokenWarning: tw } }),
  logout: () =>
    set({
      user: { fullName: null, email: null, role: "user" },
      session: { tokenExpiry: 0, tokenWarning: 0 },
    }),
}));
