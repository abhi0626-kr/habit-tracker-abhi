import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useHabits } from "@/store/habits";
import { HABIT_COLORS, HABIT_EMOJIS } from "@/lib/habit-utils";
import type { Habit } from "@/types/habit";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  habit?: Habit;
}

export function HabitDialog({ open, onOpenChange, habit }: Props) {
  const addHabit = useHabits((s) => s.addHabit);
  const updateHabit = useHabits((s) => s.updateHabit);
  const deleteHabit = useHabits((s) => s.deleteHabit);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState(HABIT_EMOJIS[0]);
  const [color, setColor] = useState(HABIT_COLORS[0]);
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [goalPerWeek, setGoalPerWeek] = useState(7);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (open) {
      setName(habit?.name ?? "");
      setDescription(habit?.description ?? "");
      setEmoji(habit?.emoji ?? HABIT_EMOJIS[0]);
      setColor(habit?.color ?? HABIT_COLORS[0]);
      setFrequency(habit?.frequency ?? "daily");
      setGoalPerWeek(habit?.goalPerWeek ?? 7);
      setCategory(habit?.category ?? "");
    }
  }, [open, habit]);

  const save = () => {
    if (!name.trim()) return;
    const payload = { name: name.trim(), description, emoji, color, frequency, goalPerWeek, category };
    if (habit) updateHabit(habit.id, payload);
    else addHabit(payload);
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto overscroll-contain"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="glass rounded-2xl w-full max-w-md p-6 relative my-auto max-h-[90vh] overflow-y-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-3 top-3 p-1 rounded-md hover:bg-white/5 text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-lg font-semibold mb-1">{habit ? "Edit habit" : "Create habit"}</h2>
            <p className="text-xs text-muted-foreground mb-5">Make it small. Make it daily.</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Read 20 pages"
                  autoFocus
                  className="mt-1 w-full bg-background/60 rounded-lg px-3 py-2 text-sm border border-border outline-none focus:border-gold/50"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Description</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional"
                  className="mt-1 w-full bg-background/60 rounded-lg px-3 py-2 text-sm border border-border outline-none focus:border-gold/50"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Icon</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {HABIT_EMOJIS.map((e) => (
                    <button key={e} onClick={() => setEmoji(e)}
                      className={cn(
                        "h-8 w-8 rounded-lg grid place-items-center text-base transition",
                        emoji === e ? "bg-gold-soft ring-1 ring-gold/60" : "bg-white/5 hover:bg-white/10"
                      )}>{e}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Color</label>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {HABIT_COLORS.map((c) => (
                    <button key={c} onClick={() => setColor(c)}
                      className={cn(
                        "h-7 w-7 rounded-full transition",
                        color === c ? "ring-2 ring-offset-2 ring-offset-background ring-gold" : ""
                      )}
                      style={{ backgroundColor: c, boxShadow: `0 0 12px ${c}55` }} />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Frequency</label>
                  <div className="mt-1 grid grid-cols-2 rounded-lg bg-white/5 p-0.5">
                    {(["daily", "weekly"] as const).map((f) => (
                      <button key={f} onClick={() => { setFrequency(f); if (f === "daily") setGoalPerWeek(7); }}
                        className={cn("py-1.5 text-xs rounded-md transition capitalize",
                          frequency === f ? "bg-gold text-primary-foreground font-medium" : "text-muted-foreground")}>{f}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Goal / week</label>
                  <input
                    type="number" min={1} max={7}
                    value={goalPerWeek}
                    onChange={(e) => setGoalPerWeek(Math.min(7, Math.max(1, +e.target.value || 1)))}
                    disabled={frequency === "daily"}
                    className="mt-1 w-full bg-background/60 rounded-lg px-3 py-2 text-sm border border-border outline-none focus:border-gold/50 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Category</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Health, Work, Mind…"
                  className="mt-1 w-full bg-background/60 rounded-lg px-3 py-2 text-sm border border-border outline-none focus:border-gold/50"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-2">
              {habit ? (
                <button
                  onClick={() => { deleteHabit(habit.id); onOpenChange(false); }}
                  className="text-xs text-destructive/80 hover:text-destructive px-2 py-1.5"
                >Delete habit</button>
              ) : <span />}
              <div className="flex gap-2">
                <button onClick={() => onOpenChange(false)} className="px-4 py-2 text-sm rounded-lg hover:bg-white/5">Cancel</button>
                <button onClick={save} className="px-4 py-2 text-sm rounded-lg bg-gold text-primary-foreground font-medium hover:brightness-110">{habit ? "Save" : "Create"}</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
