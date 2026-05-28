import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CompletionMap, Habit, Settings } from "@/types/habit";
import { dateKey, HABIT_COLORS, HABIT_EMOJIS } from "@/lib/habit-utils";
import { subDays } from "date-fns";

interface HabitState {
  habits: Habit[];
  completions: CompletionMap;
  settings: Settings;
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  addHabit: (h: Omit<Habit, "id" | "createdAt">) => void;
  updateHabit: (id: string, patch: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleCompletion: (habitId: string, date: Date) => void;
  reorderHabits: (ids: string[]) => void;
  resetAll: () => void;
  resetCompletions: () => void;
  resetMonth: (year: number, month: number) => void;

  importData: (data: { habits: Habit[]; completions: CompletionMap; settings?: Settings }) => void;
  updateSettings: (patch: Partial<Settings>) => void;
}

const uid = () => Math.random().toString(36).slice(2, 11);

function seed(): Pick<HabitState, "habits" | "completions"> {
  const habits: Habit[] = [
    { id: uid(), name: "Morning Workout", emoji: "💪", color: HABIT_COLORS[0], frequency: "daily", goalPerWeek: 7, createdAt: new Date().toISOString(), description: "30 min strength or cardio", category: "Health" },
    { id: uid(), name: "Read 20 pages", emoji: "📚", color: HABIT_COLORS[1], frequency: "daily", goalPerWeek: 7, createdAt: new Date().toISOString(), category: "Mind" },
    { id: uid(), name: "Meditation", emoji: "🧘", color: HABIT_COLORS[2], frequency: "daily", goalPerWeek: 5, createdAt: new Date().toISOString(), category: "Mind" },
    { id: uid(), name: "Drink Water 2L", emoji: "💧", color: HABIT_COLORS[3], frequency: "daily", goalPerWeek: 7, createdAt: new Date().toISOString(), category: "Health" },
    { id: uid(), name: "Side Project", emoji: "✍️", color: HABIT_COLORS[4], frequency: "weekly", goalPerWeek: 4, createdAt: new Date().toISOString(), category: "Work" },
  ];
  const completions: CompletionMap = {};
  const today = new Date();
  habits.forEach((h, idx) => {
    completions[h.id] = {};
    for (let i = 0; i < 90; i++) {
      const d = subDays(today, i);
      // realistic probability per habit
      const p = [0.85, 0.7, 0.6, 0.9, 0.4][idx] ?? 0.6;
      if (Math.random() < p) completions[h.id][dateKey(d)] = true;
    }
  });
  return { habits, completions };
}

export const useHabits = create<HabitState>()(
  persist(
    (set, get) => ({
      ...seed(),
      settings: { reminderEnabled: false, reminderTime: "20:00" },
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      addHabit: (h) =>
        set((s) => ({
          habits: [
            ...s.habits,
            {
              ...h,
              id: uid(),
              createdAt: new Date().toISOString(),
              emoji: h.emoji || HABIT_EMOJIS[Math.floor(Math.random() * HABIT_EMOJIS.length)],
              color: h.color || HABIT_COLORS[Math.floor(Math.random() * HABIT_COLORS.length)],
            },
          ],
        })),
      updateHabit: (id, patch) =>
        set((s) => ({ habits: s.habits.map((h) => (h.id === id ? { ...h, ...patch } : h)) })),
      deleteHabit: (id) =>
        set((s) => {
          const { [id]: _, ...rest } = s.completions;
          return { habits: s.habits.filter((h) => h.id !== id), completions: rest };
        }),
      toggleCompletion: (habitId, date) =>
        set((s) => {
          const k = dateKey(date);
          const prev = s.completions[habitId] ?? {};
          const next = { ...prev };
          if (next[k]) delete next[k];
          else next[k] = true;
          return { completions: { ...s.completions, [habitId]: next } };
        }),
      reorderHabits: (ids) =>
        set((s) => ({ habits: ids.map((id) => s.habits.find((h) => h.id === id)!).filter(Boolean) })),
      resetAll: () => set({ habits: [], completions: {} }),
      resetCompletions: () =>
        set((s) => ({ completions: Object.fromEntries(s.habits.map((h) => [h.id, {}])) })),
      resetMonth: (year, month) =>
        set((s) => {
          const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
          const next: typeof s.completions = {};
          for (const [hid, days] of Object.entries(s.completions)) {
            next[hid] = Object.fromEntries(Object.entries(days).filter(([k]) => !k.startsWith(prefix)));
          }
          return { completions: next };
        }),

      importData: (data) =>
        set({
          habits: data.habits ?? [],
          completions: data.completions ?? {},
          settings: data.settings ?? get().settings,
        }),
      updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),
    }),
    {
      name: "habit-tracker-v1",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : (undefined as any))),
      skipHydration: true,
    }
  )
);
