import { create } from "zustand";
import type { User } from "firebase/auth";

export type SyncStatus = "idle" | "loading" | "pending" | "syncing" | "synced" | "error" | "offline";

interface AuthState {
  user: User | null;
  ready: boolean;
  syncStatus: SyncStatus;
  pendingCount: number;
  lastSyncedAt: number | null;
  setUser: (u: User | null) => void;
  setReady: (v: boolean) => void;
  setSync: (patch: Partial<Pick<AuthState, "syncStatus" | "pendingCount" | "lastSyncedAt">>) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  ready: false,
  syncStatus: "idle",
  pendingCount: 0,
  lastSyncedAt: null,
  setUser: (user) => set({ user }),
  setReady: (ready) => set({ ready }),
  setSync: (patch) => set(patch),
}));
