import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { eachDayOfInterval, format, getDay, startOfWeek, subDays, isFuture } from "date-fns";
import { motion } from "framer-motion";
import { useHabits } from "@/store/habits";
import { dateKey, isCompleted } from "@/lib/habit-utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/heatmap")({
  head: () => ({
    meta: [
      { title: "Heatmap — Habitus" },
      { name: "description", content: "GitHub-style contribution heatmap of your habit completions." },
    ],
  }),
  component: HeatmapPage,
});

function HeatmapPage() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  const [filter, setFilter] = useState<string>("all");
  const [hover, setHover] = useState<string | null>(null);

  const { weeks, monthLabels, counts } = useMemo(() => {
    const today = new Date();
    const end = today;
    // 53 weeks back, aligned to Monday
    const start = startOfWeek(subDays(end, 53 * 7), { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });
    const counts: Record<string, number> = {};
    days.forEach((d) => {
      const k = dateKey(d);
      let c = 0;
      const list = filter === "all" ? habits : habits.filter((h) => h.id === filter);
      list.forEach((h) => { if (isCompleted(completions, h.id, d)) c++; });
      counts[k] = c;
    });
    // group into weeks (7 rows x N cols)
    const weeks: Date[][] = [];
    let week: Date[] = Array(7).fill(null);
    days.forEach((d) => {
      const idx = (getDay(d) + 6) % 7; // monday=0
      week[idx] = d;
      if (idx === 6) {
        weeks.push(week);
        week = Array(7).fill(null);
      }
    });
    if (week.some(Boolean)) weeks.push(week);
    const monthLabels: { col: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((w, i) => {
      const firstReal = w.find(Boolean);
      if (firstReal && firstReal.getMonth() !== lastMonth) {
        monthLabels.push({ col: i, label: format(firstReal, "MMM") });
        lastMonth = firstReal.getMonth();
      }
    });
    return { weeks, monthLabels, counts };
  }, [habits, completions, filter]);

  const max = filter === "all" ? Math.max(1, habits.length) : 1;
  const level = (n: number) => {
    if (!n) return 0;
    const r = n / max;
    if (r < 0.25) return 1;
    if (r < 0.5) return 2;
    if (r < 0.75) return 3;
    return 4;
  };
  const colors = ["var(--heat-0)", "var(--heat-1)", "var(--heat-2)", "var(--heat-3)", "var(--heat-4)"];

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1200px]">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Heatmap</p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">{total} contributions in the last year</h1>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="glass rounded-lg px-3 py-2 text-sm outline-none border-border bg-transparent"
        >
          <option value="all">All habits</option>
          {habits.map((h) => <option key={h.id} value={h.id}>{h.emoji} {h.name}</option>)}
        </select>
      </header>

      <div className="glass rounded-2xl p-5 overflow-x-auto scrollbar-thin">
        <div className="inline-block min-w-full">
          <div className="flex gap-[3px] text-[10px] text-muted-foreground ml-7 mb-1 relative h-3">
            {monthLabels.map((m) => (
              <span key={m.col} className="absolute" style={{ left: m.col * 15 }}>{m.label}</span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            <div className="flex flex-col gap-[3px] text-[9px] text-muted-foreground mr-1 w-5">
              {["Mon", "", "Wed", "", "Fri", "", "Sun"].map((d, i) => (
                <div key={i} className="h-3 flex items-center">{d}</div>
              ))}
            </div>
            {weeks.map((w, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {w.map((d, j) => {
                  if (!d) return <div key={j} className="h-3 w-3" />;
                  const k = dateKey(d);
                  const n = counts[k] ?? 0;
                  const lv = level(n);
                  const future = isFuture(d);
                  return (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: future ? 0.15 : 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.005 }}
                      onMouseEnter={() => setHover(k)}
                      onMouseLeave={() => setHover(null)}
                      className={cn(
                        "h-3 w-3 rounded-[3px] relative cursor-default transition",
                        hover === k && "ring-1 ring-gold"
                      )}
                      style={{ backgroundColor: colors[lv] }}
                    >
                      {hover === k && (
                        <div className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-1.5 glass rounded-md px-2 py-1 text-[11px] whitespace-nowrap">
                          <span className="font-semibold text-gold">{n}</span> on {format(d, "MMM d, yyyy")}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 text-[11px] text-muted-foreground justify-end">
            Less
            {colors.map((c, i) => <span key={i} className="h-3 w-3 rounded-[3px]" style={{ backgroundColor: c }} />)}
            More
          </div>
        </div>
      </div>
    </div>
  );
}
