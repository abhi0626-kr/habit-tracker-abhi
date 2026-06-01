import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LayoutDashboard, CalendarDays, Flame, BarChart3, Plus } from "lucide-react";
import logo from "@/assets/habits-logo.jpg";
import { useState } from "react";
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

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <aside className="hidden md:flex w-72 shrink-0 flex-col gap-4 border-r border-border bg-surface/40 backdrop-blur-xl p-4 h-screen max-h-screen sticky top-0 overflow-y-auto scrollbar-thin">
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

      <div className="pt-2 border-t border-border">
        <SidebarControls />
      </div>

      <HabitDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </aside>
  );
}
