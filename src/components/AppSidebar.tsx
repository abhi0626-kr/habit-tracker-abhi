import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, CalendarDays, Flame, BarChart3,
  Plus, GripVertical,
} from "lucide-react";
import logo from "@/assets/habits-logo.jpg";
import { useState } from "react";
import { useHabits } from "@/store/habits";
import { HabitDialog } from "./HabitDialog";
import { SidebarControls } from "./SidebarControls";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/heatmap", label: "Heatmap", icon: Flame },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const habits = useHabits((s) => s.habits);
  const reorderHabits = useHabits((s) => s.reorderHabits);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const onDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) { setDragId(null); setOverId(null); return; }
    const ids = habits.map((h) => h.id);
    const from = ids.indexOf(dragId);
    const to = ids.indexOf(targetId);
    if (from < 0 || to < 0) return;
    ids.splice(to, 0, ids.splice(from, 1)[0]);
    reorderHabits(ids);
    setDragId(null);
    setOverId(null);
  };

  return (
    <aside className="hidden md:flex w-72 shrink-0 flex-col gap-4 border-r border-border bg-surface/40 backdrop-blur-xl p-4 h-screen sticky top-0">
      <div className="flex items-center gap-3 px-1 pt-1">
        <img
          src={logo}
          alt="Habits logo"
          width={44}
          height={44}
          className="h-11 w-11 rounded-2xl object-cover ring-1 ring-border shadow-sm"
        />
        <div>
          <div className="text-base font-semibold tracking-tight text-sage">Habits</div>
          <div className="text-[11px] text-muted-foreground">A calmer journey</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((n) => {
          const active = pathname === n.to;
          return (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active ? "text-gold bg-gold-soft" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
              {active && (
                <motion.div
                  layoutId="sb-active"
                  className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-gold"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-2">
        <button
          onClick={() => setDialogOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-gold text-primary-foreground text-sm font-medium py-2 hover:brightness-110 transition"
        >
          <Plus className="h-4 w-4" /> New Habit
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin -mx-1 px-1">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground px-2 mb-2 flex items-center justify-between">
          <span>Habits ({habits.length})</span>
          <span className="text-[9px] normal-case tracking-normal text-muted-foreground/70">drag to reorder</span>
        </div>
        <ul className="space-y-1">
          {habits.map((h) => {
            const dragging = dragId === h.id;
            const over = overId === h.id && dragId && dragId !== h.id;
            return (
              <li
                key={h.id}
                draggable
                onDragStart={(e) => { setDragId(h.id); e.dataTransfer.effectAllowed = "move"; }}
                onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; if (overId !== h.id) setOverId(h.id); }}
                onDragLeave={() => { if (overId === h.id) setOverId(null); }}
                onDrop={(e) => { e.preventDefault(); onDrop(h.id); }}
                onDragEnd={() => { setDragId(null); setOverId(null); }}
                className={cn(
                  "group flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/5 transition",
                  dragging && "opacity-40",
                  over && "ring-1 ring-gold/60 bg-gold-soft/40"
                )}
              >
                <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-muted-foreground cursor-grab active:cursor-grabbing shrink-0" />
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: h.color, boxShadow: `0 0 8px ${h.color}55` }}
                />
                <span className="text-xs truncate flex-1">{h.emoji} {h.name}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="pt-2 border-t border-border">
        <SidebarControls />
      </div>

      <HabitDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </aside>
  );
}
