import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  startOfMonth, endOfMonth, eachDayOfInterval, addMonths, format,
  isSameDay, isFuture, isToday, startOfYear,
} from "date-fns";
import { ChevronLeft, ChevronRight, Flame, Trophy, Target, CheckCircle2, Pencil } from "lucide-react";
import { useHabits } from "@/store/habits";
import { bestStreak, completionRate, currentStreak, dateKey, isCompleted } from "@/lib/habit-utils";
import { HabitDialog } from "@/components/HabitDialog";
import type { Habit } from "@/types/habit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Habitus" },
      { name: "description", content: "Track your daily habits, streaks and monthly completion at a glance." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  const toggle = useHabits((s) => s.toggleCompletion);
  const [cursor, setCursor] = useState(new Date());
  const [editing, setEditing] = useState<Habit | undefined>();

  const monthDays = useMemo(
    () => eachDayOfInterval({ start: startOfMonth(cursor), end: endOfMonth(cursor) }),
    [cursor]
  );

  const stats = useMemo(() => {
    const today = new Date();
    let totalCheckins = 0;
    let best = 0;
    let bestCurrent = 0;
    habits.forEach((h) => {
      totalCheckins += Object.values(completions[h.id] ?? {}).filter(Boolean).length;
      best = Math.max(best, bestStreak(completions, h.id));
      bestCurrent = Math.max(bestCurrent, currentStreak(completions, h.id, today));
    });
    let monthDone = 0, monthExpected = 0;
    habits.forEach((h) => {
      monthDays.forEach((d) => {
        if (isFuture(d)) return;
        monthExpected += h.frequency === "daily" ? 1 : h.goalPerWeek / 7;
        if (isCompleted(completions, h.id, d)) monthDone++;
      });
    });
    const monthPct = monthExpected ? Math.round((monthDone / monthExpected) * 100) : 0;
    return { totalCheckins, best, bestCurrent, monthPct };
  }, [habits, completions, monthDays]);

  const dailyScore = (d: Date) => {
    if (!habits.length || isFuture(d)) return 0;
    const done = habits.filter((h) => isCompleted(completions, h.id, d)).length;
    return Math.round((done / habits.length) * 100);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1400px]">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Dashboard</p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">
            {format(new Date(), "EEEE, MMMM d")}
          </h1>
        </div>
        <div className="flex items-center gap-1 glass rounded-xl p-1">
          <button onClick={() => setCursor((d) => addMonths(d, -1))} className="p-2 rounded-lg hover:bg-white/5"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => setCursor(new Date())} className="px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-white/5">Today</button>
          <div className="px-3 py-1.5 text-sm font-medium min-w-[120px] text-center">{format(cursor, "MMMM yyyy")}</div>
          <button onClick={() => setCursor((d) => addMonths(d, 1))} className="p-2 rounded-lg hover:bg-white/5"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Flame className="h-4 w-4" />} label="Current streak" value={`${stats.bestCurrent}`} suffix="days" />
        <StatCard icon={<Trophy className="h-4 w-4" />} label="Best streak" value={`${stats.best}`} suffix="days" />
        <StatCard icon={<Target className="h-4 w-4" />} label="This month" value={`${stats.monthPct}%`} progress={stats.monthPct} />
        <StatCard icon={<CheckCircle2 className="h-4 w-4" />} label="Total check-ins" value={`${stats.totalCheckins}`} />
      </section>

      <section className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-sm font-semibold">Habit tracker</h2>
            <p className="text-xs text-muted-foreground">Tap circles to mark complete</p>
          </div>
          <div className="text-xs text-muted-foreground">{habits.length} habits · {monthDays.length} days</div>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="sticky left-0 z-10 bg-surface/80 backdrop-blur text-left font-medium px-5 py-3 min-w-[200px]">Habit</th>
                {monthDays.map((d) => (
                  <th key={d.toISOString()} className={cn(
                    "px-1 py-3 font-medium text-center w-9",
                    isToday(d) && "text-gold"
                  )}>
                    <div>{format(d, "EEEEE")}</div>
                    <div className="font-semibold text-foreground/70">{format(d, "d")}</div>
                  </th>
                ))}
                <th className="px-4 py-3 font-medium text-right">%</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((h) => {
                const rate = completionRate(completions, h, startOfMonth(cursor),
                  monthDays[monthDays.length - 1] < new Date() ? endOfMonth(cursor) : new Date());
                return (
                  <tr key={h.id} className="border-t border-border/60 group">
                    <td className="sticky left-0 z-10 bg-surface/80 backdrop-blur px-5 py-2">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: h.color, boxShadow: `0 0 8px ${h.color}66` }} />
                        <span className="text-base leading-none">{h.emoji}</span>
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">{h.name}</div>
                          {h.category && <div className="text-[10px] text-muted-foreground">{h.category}</div>}
                        </div>
                        <button onClick={() => setEditing(h)} className="opacity-0 group-hover:opacity-100 ml-1 p-1 rounded text-muted-foreground hover:text-foreground transition">
                          <Pencil className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    {monthDays.map((d) => {
                      const done = isCompleted(completions, h.id, d);
                      const future = isFuture(d) && !isSameDay(d, new Date());
                      return (
                        <td key={d.toISOString()} className="text-center px-0.5 py-2">
                          <button
                            disabled={future}
                            onClick={() => toggle(h.id, d)}
                            className={cn(
                              "h-7 w-7 rounded-full grid place-items-center transition",
                              done
                                ? "scale-100"
                                : "bg-white/[0.04] hover:bg-white/[0.08] border border-border",
                              future && "opacity-20 cursor-not-allowed",
                              isToday(d) && !done && "ring-1 ring-gold/40"
                            )}
                            style={done ? {
                              backgroundColor: h.color,
                              boxShadow: `0 0 12px ${h.color}80`,
                            } : undefined}
                          >
                            {done && <CheckCircle2 className="h-3.5 w-3.5 text-black/70" />}
                          </button>
                        </td>
                      );
                    })}
                    <td className="px-4 py-2 text-right">
                      <span className="text-xs font-mono text-gold">{rate}%</span>
                    </td>
                  </tr>
                );
              })}
              {habits.length === 0 && (
                <tr><td colSpan={monthDays.length + 2} className="text-center py-12 text-sm text-muted-foreground">No habits yet — create one in the sidebar.</td></tr>
              )}
              <tr className="border-t border-border/60 bg-white/[0.02]">
                <td className="sticky left-0 z-10 bg-surface/80 backdrop-blur px-5 py-2 text-xs text-muted-foreground font-medium">Daily score</td>
                {monthDays.map((d) => {
                  const score = dailyScore(d);
                  return (
                    <td key={dateKey(d)} className="text-center px-0.5 py-2">
                      <div className="h-6 w-7 mx-auto rounded-md grid place-items-center text-[10px] font-mono"
                        style={{
                          backgroundColor: score ? `color-mix(in oklab, var(--gold) ${score}%, transparent)` : "transparent",
                          color: score > 50 ? "rgba(0,0,0,0.7)" : "var(--muted-foreground)",
                        }}>
                        {score || ""}
                      </div>
                    </td>
                  );
                })}
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <YearProgress />

      <HabitDialog open={!!editing} onOpenChange={(o) => !o && setEditing(undefined)} habit={editing} />
    </div>
  );
}

function StatCard({ icon, label, value, suffix, progress }: { icon: React.ReactNode; label: string; value: string; suffix?: string; progress?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="glass glass-hover rounded-xl p-4"
    >
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-xs">{label}</span>
        <span className="text-gold">{icon}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
      </div>
      {progress !== undefined && (
        <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }} animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gold rounded-full"
          />
        </div>
      )}
    </motion.div>
  );
}

function YearProgress() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  const yearDone = useMemo(() => {
    const start = startOfYear(new Date());
    const today = new Date();
    let done = 0, total = 0;
    habits.forEach((h) => {
      eachDayOfInterval({ start, end: today }).forEach((d) => {
        total++;
        if (isCompleted(completions, h.id, d)) done++;
      });
    });
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [habits, completions]);

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Year progress · {format(new Date(), "yyyy")}</h3>
        <span className="text-xs text-muted-foreground">{yearDone.done} / {yearDone.total} check-ins</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${yearDone.pct}%` }} transition={{ duration: 1 }}
          className="h-full bg-gradient-to-r from-gold/60 to-gold rounded-full" />
      </div>
      <div className="mt-2 text-right text-xs text-gold font-mono">{yearDone.pct}%</div>
    </div>
  );
}
