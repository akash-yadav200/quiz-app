import { create } from "zustand";
import { User } from "../types";

interface AuthState {
  user: User | null;
  login: (username: string, password: string, role: "user" | "admin") => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (username, password, role) =>
    set({
      user: {
        id: Math.random().toString(36).substring(7),
        username,
        password,
        role,
      },
    }),
  logout: () => set({ user: null }),
}));
