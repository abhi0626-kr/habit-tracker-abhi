import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, CalendarDays, Flame, BarChart3, Plus } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/habits-logo.jpg";
import { HabitDialog } from "./HabitDialog";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/calendar", label: "Cal", icon: CalendarDays },
  { to: "/heatmap", label: "Heat", icon: Flame },
  { to: "/analytics", label: "Stats", icon: BarChart3 },
];

export function MobileNav() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Habits" width={32} height={32} className="h-8 w-8 rounded-lg object-cover ring-1 ring-border" />
          <div className="text-sm font-semibold tracking-tight text-sage">Habits</div>
        </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="h-8 px-3 rounded-lg bg-neon text-primary-foreground text-xs font-medium flex items-center gap-1"
        >
          <Plus className="h-3.5 w-3.5" /> New
        </button>
      </header>

      {/* Bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-background/85 backdrop-blur-xl border-t border-border pb-[env(safe-area-inset-bottom)]">
        <ul className="grid grid-cols-4">
          {items.map((it) => {
            const active = pathname === it.to;
            return (
              <li key={it.to}>
                <Link
                  to={it.to}
                  className={cn(
                    "flex flex-col items-center gap-0.5 py-2.5 text-[10px] transition",
                    active ? "text-neon" : "text-muted-foreground"
                  )}
                >
                  <it.icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_8px_var(--neon)]")} />
                  {it.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <HabitDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
