import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  eachDayOfInterval, format, startOfWeek, subDays, subMonths, startOfMonth, endOfMonth,
} from "date-fns";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";
import { Award, Flame, TrendingUp, Star } from "lucide-react";
import { useHabits } from "@/store/habits";
import { bestStreak, completionRate, currentStreak, isCompleted } from "@/lib/habit-utils";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Habitus" },
      { name: "description", content: "Insights, trends, and your productivity score." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);

  const weekly = useMemo(() => {
    const today = new Date();
    const start = startOfWeek(subDays(today, 11 * 7), { weekStartsOn: 1 });
    const weeks: { week: string; count: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const wStart = subDays(start, -i * 7);
      const days = eachDayOfInterval({ start: wStart, end: subDays(wStart, -6) });
      let c = 0;
      habits.forEach((h) => days.forEach((d) => { if (isCompleted(completions, h.id, d)) c++; }));
      weeks.push({ week: format(wStart, "MMM d"), count: c });
    }
    return weeks;
  }, [habits, completions]);

  const monthly = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const m = subMonths(today, 5 - i);
      const days = eachDayOfInterval({ start: startOfMonth(m), end: endOfMonth(m) });
      let total = 0, done = 0;
      habits.forEach((h) => days.forEach((d) => {
        if (d > today) return;
        total++;
        if (isCompleted(completions, h.id, d)) done++;
      }));
      return { month: format(m, "MMM"), pct: total ? Math.round((done / total) * 100) : 0 };
    });
  }, [habits, completions]);

  const perHabit = useMemo(() => {
    const today = new Date();
    return habits.map((h) => ({
      name: h.name,
      emoji: h.emoji,
      color: h.color,
      rate: completionRate(completions, h, subDays(today, 30), today),
      best: bestStreak(completions, h.id),
      current: currentStreak(completions, h.id, today),
    }));
  }, [habits, completions]);

  const mostConsistent = [...perHabit].sort((a, b) => b.rate - a.rate)[0];
  const longestStreak = [...perHabit].sort((a, b) => b.best - a.best)[0];
  const score = Math.round(perHabit.reduce((s, h) => s + h.rate, 0) / Math.max(1, perHabit.length));

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1400px]">
      <header>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Analytics</p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">Insights & trends</h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-5 lg:col-span-1 flex flex-col items-center justify-center">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-gold" /> Productivity score
          </div>
          <div className="relative h-44 w-44">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="78%" outerRadius="100%" data={[{ value: score, fill: "var(--gold)" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: "rgba(255,255,255,0.05)" }} dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-4xl font-semibold text-gold">{score}</div>
                <div className="text-xs text-muted-foreground">last 30 days</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-gold" /> Weekly consistency</h3>
            <span className="text-xs text-muted-foreground">last 12 weeks</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={weekly} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "rgba(0,0,0,0.85)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="count" stroke="var(--gold)" strokeWidth={2} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold mb-3">Monthly completion %</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={monthly} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "rgba(0,0,0,0.85)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="pct" fill="var(--gold)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-3">
          <Insight icon={<Award className="h-4 w-4" />} label="Most consistent" value={mostConsistent ? `${mostConsistent.emoji} ${mostConsistent.name}` : "—"} sub={mostConsistent ? `${mostConsistent.rate}%` : ""} />
          <Insight icon={<Flame className="h-4 w-4" />} label="Longest streak" value={longestStreak ? `${longestStreak.emoji} ${longestStreak.name}` : "—"} sub={longestStreak ? `${longestStreak.best} days` : ""} />
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold mb-4">Habit success rate · last 30 days</h3>
        <div className="space-y-3">
          {perHabit.map((h) => (
            <div key={h.name} className="flex items-center gap-3">
              <div className="w-40 truncate text-sm flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: h.color }} />
                {h.emoji} {h.name}
              </div>
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${h.rate}%`, background: `linear-gradient(90deg, ${h.color}80, ${h.color})`, boxShadow: `0 0 12px ${h.color}50` }} />
              </div>
              <div className="w-20 text-right text-xs font-mono text-muted-foreground">
                <span className="text-gold">{h.rate}%</span>
                <span className="ml-2">🔥{h.current}</span>
              </div>
            </div>
          ))}
          {perHabit.length === 0 && <div className="text-sm text-muted-foreground text-center py-8">No habits yet.</div>}
        </div>
      </div>
    </div>
  );
}

function Insight({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="glass glass-hover rounded-2xl p-4">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-xs uppercase tracking-wider">{label}</span>
        <span className="text-gold">{icon}</span>
      </div>
      <div className="mt-2 text-base font-semibold truncate">{value}</div>
      {sub && <div className="text-xs text-gold mt-0.5">{sub}</div>}
    </div>
  );
}
