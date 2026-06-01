import { useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection, doc, getDocs, setDoc, deleteDoc, writeBatch,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/store/auth";
import { useHabits } from "@/store/habits";
import type { Habit, CompletionMap } from "@/types/habit";

export function useFirebaseSync() {
  const setUser = useAuth((s) => s.setUser);
  const setReady = useAuth((s) => s.setReady);
  const syncingRef = useRef(false);
  const currentUidRef = useRef<string | null>(null);

  // Auth listener
  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setReady(true);

      if (user) {
        if (currentUidRef.current === user.uid) return;
        currentUidRef.current = user.uid;
        // Start fresh: clear local first
        syncingRef.current = true;
        useHabits.getState().resetAll();
        // Load cloud data
        try {
          const habitsSnap = await getDocs(collection(db, "users", user.uid, "habits"));
          const habits: Habit[] = habitsSnap.docs.map((d) => d.data() as Habit);
          const completions: CompletionMap = {};
          const compsSnap = await getDocs(collection(db, "users", user.uid, "completions"));
          compsSnap.forEach((d) => {
            completions[d.id] = (d.data() as any).days ?? {};
          });
          useHabits.getState().importData({ habits, completions });
        } catch (e) {
          console.error("Cloud load failed", e);
        } finally {
          syncingRef.current = false;
        }
      } else {
        currentUidRef.current = null;
      }
    });
    return unsub;
  }, [setUser, setReady]);

  // Push changes to Firestore (debounced)
  useEffect(() => {
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

      if (timer) clearTimeout(timer);
      timer = setTimeout(async () => {
        try {
          const batch = writeBatch(db);
          // Habits
          const prevIds = new Set(prevHabits.map((h) => h.id));
          const nextIds = new Set(state.habits.map((h) => h.id));
          state.habits.forEach((h, idx) => {
            batch.set(doc(db, "users", uid, "habits", h.id), { ...h, order: idx });
          });
          prevIds.forEach((id) => {
            if (!nextIds.has(id)) batch.delete(doc(db, "users", uid, "habits", id));
          });
          // Completions per habit
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
        } catch (e) {
          console.error("Cloud sync failed", e);
        }
      }, 600);
    });
    return () => {
      unsub();
      if (timer) clearTimeout(timer);
    };
  }, []);
}
