import { useRef, useState } from "react";
import { Download, Upload, Bell, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useHabits } from "@/store/habits";
import { InstallDialog } from "./InstallDialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export function SidebarControls() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  const settings = useHabits((s) => s.settings);
  const updateSettings = useHabits((s) => s.updateSettings);
  const resetAll = useHabits((s) => s.resetAll);
  const importData = useHabits((s) => s.importData);

  const [resetOpen, setResetOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const totalCheckins = Object.values(completions).reduce(
    (acc, m) => acc + Object.values(m).filter(Boolean).length,
    0
  );

  const exportJson = () => {
    const blob = new Blob(
      [JSON.stringify({ habits, completions, settings, exportedAt: new Date().toISOString() }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `habits-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (!data.habits) throw new Error("Invalid file");
        importData(data);
        toast.success("Backup restored", { description: "Your habits and check-ins are back." });
      } catch {
        toast.error("Invalid backup file", { description: "We couldn't read that JSON file." });
      }
    };
    reader.readAsText(file);
  };

  const requestNotif = async () => {
    if (!("Notification" in window)) {
      toast.error("Not supported", { description: "This browser doesn't support notifications." });
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      updateSettings({ reminderEnabled: true });
      toast.success("Reminders enabled", { description: `We'll ping you at ${settings.reminderTime}.` });
    } else {
      toast.error("Notifications denied", { description: "Enable them in your browser settings." });
    }
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button onClick={exportJson} className="flex items-center justify-center gap-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs py-1.5 transition">
          <Download className="h-3.5 w-3.5" /> Export
        </button>
        <button onClick={() => fileRef.current?.click()} className="flex items-center justify-center gap-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs py-1.5 transition">
          <Upload className="h-3.5 w-3.5" /> Import
        </button>
        <input ref={fileRef} type="file" accept="application/json" className="hidden"
          onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
      </div>

      <div className="rounded-lg bg-white/5 p-2.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Bell className="h-3.5 w-3.5 text-gold" /> Daily reminder
          </div>
          <button
            onClick={() => settings.reminderEnabled ? updateSettings({ reminderEnabled: false }) : requestNotif()}
            className={cn(
              "h-4 w-7 rounded-full transition relative",
              settings.reminderEnabled ? "bg-gold" : "bg-white/15"
            )}
          >
            <span className={cn(
              "absolute top-0.5 h-3 w-3 rounded-full bg-background transition-all",
              settings.reminderEnabled ? "left-3.5" : "left-0.5"
            )} />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <input
            type="time"
            value={settings.reminderTime}
            onChange={(e) => updateSettings({ reminderTime: e.target.value })}
            className="flex-1 bg-background/60 rounded-md px-2 py-1 text-xs border border-border outline-none focus:border-gold/50"
          />
          <button
            onClick={async () => {
              if (!("Notification" in window)) {
                toast.error("Not supported", { description: "This browser doesn't support notifications." });
                return;
              }
              let perm = Notification.permission;
              if (perm === "default") perm = await Notification.requestPermission();
              if (perm !== "granted") {
                toast.error("Notifications denied", { description: "Enable them in your browser settings." });
                return;
              }
              new Notification("Habitus", { body: "Reminders are working ✨", icon: "/icon-192.png" });
              toast.success("Test sent", { description: "Check your system notifications." });
            }}
            className="text-[10px] px-2 py-1 rounded-md bg-gold/15 text-gold hover:bg-gold/25 transition"
            title="Send a test notification"
          >
            Test
          </button>
        </div>
        {settings.reminderEnabled && (
          <p className="text-[10px] text-muted-foreground">Notification will fire at {settings.reminderTime} while the app is open.</p>
        )}
      </div>

      <InstallDialog />

      <button
        onClick={() => setResetOpen(true)}
        className="w-full flex items-center justify-center gap-1.5 rounded-md text-destructive/80 hover:text-destructive hover:bg-destructive/10 text-xs py-1.5 transition"
      >
        <Trash2 className="h-3.5 w-3.5" /> Reset data
      </button>

      <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
        <span>{habits.length} habits</span>
        <span>{totalCheckins} check-ins</span>
      </div>

      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-destructive" />
              Delete all data?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes every habit, check-in, and setting on this device. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => { resetAll(); toast.success("Data reset", { description: "Your slate is clean." }); }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
