import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, CalendarDays, Flame, BarChart3, Plus, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/habits-logo.jpg";
import { HabitDialog } from "./HabitDialog";
import { SidebarControls } from "./SidebarControls";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
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
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Habits" width={32} height={32} className="h-8 w-8 rounded-lg object-cover ring-1 ring-border" />
          <div className="text-sm font-semibold tracking-tight text-sage">Habits</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSettingsOpen(true)}
            className="h-8 w-8 grid place-items-center rounded-lg bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition"
            aria-label="Settings"
          >
            <SettingsIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setOpen(true)}
            className="h-8 px-3 rounded-lg bg-neon text-primary-foreground text-xs font-medium flex items-center gap-1"
          >
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        </div>
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

      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent side="right" className="w-[88vw] sm:max-w-sm overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-sage">
              <SettingsIcon className="h-4 w-4" /> Settings
            </SheetTitle>
            <SheetDescription>Backups, reminders, install, and data.</SheetDescription>
          </SheetHeader>
          <div className="mt-5">
            <SidebarControls />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
