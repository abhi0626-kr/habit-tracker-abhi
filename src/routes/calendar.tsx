import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek,
  addMonths, format, isSameMonth, isToday, isFuture,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useHabits } from "@/store/habits";
import { isCompleted } from "@/lib/habit-utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Habitus" },
      { name: "description", content: "Monthly calendar view of your habit completions." },
    ],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  const [cursor, setCursor] = useState(new Date());
  const [hover, setHover] = useState<string | null>(null);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1200px]">
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Calendar</p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">{format(cursor, "MMMM yyyy")}</h1>
        </div>
        <div className="flex items-center gap-1 glass rounded-xl p-1">
          <button onClick={() => setCursor((d) => addMonths(d, -1))} className="p-2 rounded-lg hover:bg-white/5"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => setCursor(new Date())} className="px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-white/5">Today</button>
          <button onClick={() => setCursor((d) => addMonths(d, 1))} className="p-2 rounded-lg hover:bg-white/5"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </header>

      <div className="glass rounded-2xl p-4">
        <div className="grid grid-cols-7 text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="px-2 py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d) => {
            const inMonth = isSameMonth(d, cursor);
            const completed = habits.filter((h) => isCompleted(completions, h.id, d));
            const future = isFuture(d);
            const key = d.toISOString();
            return (
              <motion.div
                key={key}
                onMouseEnter={() => setHover(key)}
                onMouseLeave={() => setHover(null)}
                whileHover={{ y: -2 }}
                className={cn(
                  "relative aspect-square rounded-xl p-2 border transition cursor-default",
                  inMonth ? "bg-white/[0.02] border-border" : "bg-transparent border-transparent text-muted-foreground/40",
                  isToday(d) && "ring-1 ring-gold/60",
                  future && "opacity-50"
                )}
              >
                <div className={cn("text-xs", isToday(d) && "text-gold font-semibold")}>{format(d, "d")}</div>
                <div className="absolute bottom-1.5 left-1.5 right-1.5 flex flex-wrap gap-0.5">
                  {completed.slice(0, 8).map((h) => (
                    <span key={h.id} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: h.color, boxShadow: `0 0 4px ${h.color}` }} />
                  ))}
                </div>
                {hover === key && completed.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute z-20 left-1/2 -translate-x-1/2 -top-2 -translate-y-full glass rounded-lg px-3 py-2 text-xs min-w-[160px] whitespace-nowrap shadow-xl"
                  >
                    <div className="font-semibold mb-1">{format(d, "MMM d, yyyy")}</div>
                    {completed.map((h) => (
                      <div key={h.id} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: h.color }} />
                        {h.emoji} {h.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
