import { useEffect } from "react";
import { useHabits } from "@/store/habits";

export function useHydrateStore() {
  const hydrated = useHabits((s) => s.hydrated);
  useEffect(() => {
    if (hydrated) return;
    useHabits.persist.rehydrate()?.then?.(() => useHabits.getState().setHydrated(true));
    // fallback in case rehydrate returns void
    setTimeout(() => useHabits.getState().setHydrated(true), 0);
  }, [hydrated]);
  return hydrated;
}
