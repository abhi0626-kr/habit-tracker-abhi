import { create } from "zustand";
import type { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  ready: boolean;
  setUser: (u: User | null) => void;
  setReady: (v: boolean) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  ready: false,
  setUser: (user) => set({ user }),
  setReady: (ready) => set({ ready }),
}));
