import { useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/store/auth";
import { useHabits } from "@/store/habits";
import type { Habit, CompletionMap } from "@/types/habit";

export function useFirebaseSync() {
  const setUser = useAuth((s) => s.setUser);
  const setReady = useAuth((s) => s.setReady);
  const setSync = useAuth((s) => s.setSync);
  const syncingRef = useRef(false);
  const currentUidRef = useRef<string | null>(null);
  const pendingRef = useRef(0);

  // Auth listener
  useEffect(() => {
    if (typeof window === "undefined" || !auth) return;
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setReady(true);

      if (user) {
        if (currentUidRef.current === user.uid) return;
        currentUidRef.current = user.uid;
        syncingRef.current = true;
        setSync({ syncStatus: "loading", pendingCount: 0 });
        useHabits.getState().resetAll();
        try {
          const [habitsSnap, compsSnap] = await Promise.all([
            getDocs(collection(db, "users", user.uid, "habits")),
            getDocs(collection(db, "users", user.uid, "completions")),
          ]);
          const habits: Habit[] = habitsSnap.docs
            .map((d) => d.data() as Habit & { order?: number })
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          const completions: CompletionMap = {};
          compsSnap.forEach((d) => {
            completions[d.id] = (d.data() as any).days ?? {};
          });
          useHabits.getState().importData({ habits, completions });
          setSync({ syncStatus: "synced", lastSyncedAt: Date.now() });
        } catch (e) {
          console.error("Cloud load failed", e);
          setSync({ syncStatus: "error" });
        } finally {
          syncingRef.current = false;
        }
      } else {
        currentUidRef.current = null;
        setSync({ syncStatus: "idle", pendingCount: 0, lastSyncedAt: null });
      }
    });
    return unsub;
  }, [setUser, setReady, setSync]);

  // Online/offline tracking
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onOffline = () => {
      if (currentUidRef.current) setSync({ syncStatus: "offline" });
    };
    const onOnline = () => {
      if (currentUidRef.current && pendingRef.current === 0) setSync({ syncStatus: "synced" });
    };
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, [setSync]);

  // Push changes to Firestore (debounced)
  useEffect(() => {
    if (typeof window === "undefined") return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let lastHabits = useHabits.getState().habits;
    let lastCompletions = useHabits.getState().completions;

    const unsub = useHabits.subscribe((state) => {
      const uid = currentUidRef.current;
      if (!uid || syncingRef.current) {
        lastHabits = state.habits;
        lastCompletions = state.completions;
        return;
      }
      if (state.habits === lastHabits && state.completions === lastCompletions) return;

      const prevHabits = lastHabits;
      const prevCompletions = lastCompletions;
      lastHabits = state.habits;
      lastCompletions = state.completions;

      pendingRef.current += 1;
      setSync({ syncStatus: "pending", pendingCount: pendingRef.current });

      if (timer) clearTimeout(timer);
      timer = setTimeout(async () => {
        const inFlight = pendingRef.current;
        setSync({ syncStatus: "syncing" });
        try {
          const batch = writeBatch(db);
          const prevIds = new Set(prevHabits.map((h) => h.id));
          const nextIds = new Set(state.habits.map((h) => h.id));
          state.habits.forEach((h, idx) => {
            batch.set(doc(db, "users", uid, "habits", h.id), { ...h, order: idx });
          });
          prevIds.forEach((id) => {
            if (!nextIds.has(id)) batch.delete(doc(db, "users", uid, "habits", id));
          });
          Object.entries(state.completions).forEach(([habitId, days]) => {
            if (prevCompletions[habitId] !== days) {
              batch.set(doc(db, "users", uid, "completions", habitId), { days });
            }
          });
          Object.keys(prevCompletions).forEach((habitId) => {
            if (!(habitId in state.completions)) {
              batch.delete(doc(db, "users", uid, "completions", habitId));
            }
          });
          await batch.commit();
          pendingRef.current = Math.max(0, pendingRef.current - inFlight);
          setSync({
            syncStatus: pendingRef.current > 0 ? "pending" : "synced",
            pendingCount: pendingRef.current,
            lastSyncedAt: Date.now(),
          });
        } catch (e) {
          console.error("Cloud sync failed", e);
          setSync({ syncStatus: "error" });
        }
      }, 600);
    });
    return () => {
      unsub();
      if (timer) clearTimeout(timer);
    };
  }, [setSync]);
}
