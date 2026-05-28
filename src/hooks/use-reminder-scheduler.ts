import { useEffect } from "react";
import { useHabits } from "@/store/habits";
import { dateKey } from "@/lib/habit-utils";

/**
 * Polls every 30s. When the local time matches the configured reminder time
 * and we haven't already fired today, sends a browser notification.
 * Uses localStorage to track the last fired date (survives reloads).
 */
export function useReminderScheduler() {
  const enabled = useHabits((s) => s.settings.reminderEnabled);
  const time = useHabits((s) => s.settings.reminderTime);
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined" || !("Notification" in window)) return;

    const tick = () => {
      if (Notification.permission !== "granted") return;
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      if (hhmm !== time) return;
      const today = dateKey(now);
      const lastKey = "habitus-last-reminder";
      if (localStorage.getItem(lastKey) === today) return;
      localStorage.setItem(lastKey, today);

      const todayKey = dateKey(now);
      const remaining = habits.filter((h) => !completions[h.id]?.[todayKey]).length;
      const body = remaining
        ? `You have ${remaining} habit${remaining > 1 ? "s" : ""} left for today.`
        : "All habits done today. Keep the streak alive!";

      new Notification("Habitus — Daily check-in", {
        body,
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        tag: "habitus-daily",
      });
    };

    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [enabled, time, habits, completions]);
}
