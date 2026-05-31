import { format, parseISO, differenceInCalendarDays, startOfWeek, addDays, subDays } from "date-fns";
import type { CompletionMap, Habit } from "@/types/habit";

export const dateKey = (d: Date) => format(d, "yyyy-MM-dd");

export const isCompleted = (c: CompletionMap, habitId: string, d: Date) =>
  !!c[habitId]?.[dateKey(d)];

export function currentStreak(c: CompletionMap, habitId: string, today = new Date()): number {
  let streak = 0;
  let cursor = today;
  // If today not completed, start checking from yesterday so streaks don't break mid-day
  if (!isCompleted(c, habitId, cursor)) cursor = subDays(cursor, 1);
  while (isCompleted(c, habitId, cursor)) {
    streak++;
    cursor = subDays(cursor, 1);
  }
  return streak;
}

export function bestStreak(c: CompletionMap, habitId: string): number {
  const days = Object.keys(c[habitId] ?? {}).filter((k) => c[habitId][k]).sort();
  if (!days.length) return 0;
  let best = 1, cur = 1;
  for (let i = 1; i < days.length; i++) {
    const diff = differenceInCalendarDays(parseISO(days[i]), parseISO(days[i - 1]));
    if (diff === 1) cur++;
    else cur = 1;
    if (cur > best) best = cur;
  }
  return best;
}

export function completionRate(
  c: CompletionMap,
  habit: Habit,
  from: Date,
  to: Date
): number {
  const totalDays = differenceInCalendarDays(to, from) + 1;
  if (totalDays <= 0) return 0;
  let done = 0;
  for (let i = 0; i < totalDays; i++) {
    if (isCompleted(c, habit.id, addDays(from, i))) done++;
  }
  const expected = habit.frequency === "daily" ? totalDays : Math.ceil((totalDays / 7) * habit.goalPerWeek);
  return Math.min(100, Math.round((done / Math.max(1, expected)) * 100));
}

export function weekDays(d: Date) {
  const start = startOfWeek(d, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

/** Completions for a habit in the ISO week containing `d`. */
export function weekCompletions(c: CompletionMap, habitId: string, d: Date): number {
  return weekDays(d).reduce((n, day) => (isCompleted(c, habitId, day) ? n + 1 : n), 0);
}

/** Weekly target for a habit. Daily habits target 7/week. */
export function weeklyTarget(habit: Habit): number {
  const t = habit.frequency === "daily" ? 7 : habit.goalPerWeek;
  return Math.min(7, Math.max(1, t));
}


export const HABIT_COLORS = [
  "#F5C24A", "#7DD3FC", "#86EFAC", "#F472B6",
  "#A78BFA", "#FB923C", "#34D399", "#60A5FA",
  "#F87171", "#C084FC",
];

export const HABIT_EMOJIS = [
  "💪", "📚", "🧘", "🏃", "💧", "🥗", "😴", "✍️",
  "🎯", "🧠", "🎨", "🌱", "☀️", "🔥", "⭐", "🎵",
];
