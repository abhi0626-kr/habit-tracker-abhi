import { useEffect, useState } from "react";
import { Cloud, CloudOff, RefreshCw, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { useAuth } from "@/store/auth";
import { cn } from "@/lib/utils";

function timeAgo(ts: number | null) {
  if (!ts) return "never";
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function SyncStatus() {
  const user = useAuth((s) => s.user);
  const status = useAuth((s) => s.syncStatus);
  const pending = useAuth((s) => s.pendingCount);
  const lastSyncedAt = useAuth((s) => s.lastSyncedAt);
  const [, force] = useState(0);

  // Re-render every 15s to refresh relative time
  useEffect(() => {
    const i = setInterval(() => force((n) => n + 1), 15000);
    return () => clearInterval(i);
  }, []);

  if (!user) return null;

  const meta = {
    loading:  { Icon: RefreshCw,    color: "text-gold",        label: "Loading…",   spin: true },
    syncing:  { Icon: RefreshCw,    color: "text-gold",        label: "Syncing…",   spin: true },
    pending:  { Icon: Clock,        color: "text-gold",        label: "Pending",    spin: false },
    synced:   { Icon: CheckCircle2, color: "text-emerald-400", label: "Up to date", spin: false },
    error:    { Icon: AlertTriangle,color: "text-destructive", label: "Sync error", spin: false },
    offline:  { Icon: CloudOff,     color: "text-muted-foreground", label: "Offline", spin: false },
    idle:     { Icon: Cloud,        color: "text-muted-foreground", label: "Idle",   spin: false },
  }[status];

  const { Icon, color, label, spin } = meta;

  return (
    <div className="rounded-lg bg-white/5 px-2.5 py-2 flex items-center gap-2">
      <Icon className={cn("h-3.5 w-3.5 shrink-0", color, spin && "animate-spin")} />
      <div className="flex-1 min-w-0">
        <div className={cn("text-[11px] font-medium leading-tight", color)}>{label}</div>
        <div className="text-[10px] text-muted-foreground leading-tight truncate">
          Synced {timeAgo(lastSyncedAt)}
          {pending > 0 && ` · ${pending} queued`}
        </div>
      </div>
    </div>
  );
}
