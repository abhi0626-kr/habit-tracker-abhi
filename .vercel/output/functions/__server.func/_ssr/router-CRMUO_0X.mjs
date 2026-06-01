import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, u as useRouter, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent, O as Outlet, d as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as create, p as persist, a as createJSONStorage } from "../_libs/zustand.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { R as Root2, P as Portal2, a as Content2, T as Title2, D as Description2, C as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import "../_libs/firebase.mjs";
import { o as onAuthStateChanged, g as getAuth, a as signOut, s as signInWithPopup, G as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
import { c as getApps, g as getApp, i as initializeApp } from "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import { w as writeBatch, d as doc, g as getDocs, c as collection, a as getFirestore } from "../_libs/firebase__firestore.mjs";
import { R as Root, P as Portal, a as Content, C as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { L as LayoutDashboard, C as CalendarDays, F as Flame, b as ChartColumn, k as Plus, S as Settings, D as Download, U as Upload, B as Bell, p as Trash2, X, j as LogOut, i as LogIn, M as Monitor, A as Apple, m as Smartphone, g as Cloud, h as CloudOff, r as TriangleAlert, e as CircleCheck, f as Clock, R as RefreshCw } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { g as format, o as subDays, d as differenceInCalendarDays, p as parseISO, a as addDays, m as startOfWeek } from "../_libs/date-fns.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "process";
import "tls";
import "fs";
import "os";
import "net";
import "events";
import "http2";
import "http";
import "url";
import "dns";
import "zlib";
import "../_libs/@grpc/proto-loader.mjs";
import "path";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_libs/protobufjs__aspromise.mjs";
import "../_libs/protobufjs__base64.mjs";
import "../_libs/protobufjs__eventemitter.mjs";
import "../_libs/protobufjs__float.mjs";
import "../_libs/@protobufjs/inquire.mjs";
import "../_libs/protobufjs__utf8.mjs";
import "../_libs/protobufjs__pool.mjs";
import "../_libs/long.mjs";
import "../_libs/protobufjs__codegen.mjs";
import "../_libs/protobufjs__fetch.mjs";
import "../_libs/protobufjs__path.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const appCss = "/assets/styles-Bb_--ShY.css";
const logo = "/assets/habits-logo-C-TspMka.jpg";
const dateKey = (d) => format(d, "yyyy-MM-dd");
const isCompleted = (c, habitId, d) => !!c[habitId]?.[dateKey(d)];
function currentStreak(c, habitId, today = /* @__PURE__ */ new Date()) {
  let streak = 0;
  let cursor = today;
  if (!isCompleted(c, habitId, cursor)) cursor = subDays(cursor, 1);
  while (isCompleted(c, habitId, cursor)) {
    streak++;
    cursor = subDays(cursor, 1);
  }
  return streak;
}
function bestStreak(c, habitId) {
  const days = Object.keys(c[habitId] ?? {}).filter((k) => c[habitId][k]).sort();
  if (!days.length) return 0;
  let best = 1, cur = 1;
  for (let i = 1; i < days.length; i++) {
    const diff = differenceInCalendarDays(parseISO(days[i]), parseISO(days[i - 1]));
    if (diff === 1) cur++;
    else cur = 1;
    if (cur > best) best = cur;
  }
  return best;
}
function completionRate(c, habit, from, to) {
  const totalDays = differenceInCalendarDays(to, from) + 1;
  if (totalDays <= 0) return 0;
  let done = 0;
  for (let i = 0; i < totalDays; i++) {
    if (isCompleted(c, habit.id, addDays(from, i))) done++;
  }
  const expected = habit.frequency === "daily" ? totalDays : Math.ceil(totalDays / 7 * habit.goalPerWeek);
  return Math.min(100, Math.round(done / Math.max(1, expected) * 100));
}
function weekDays(d) {
  const start = startOfWeek(d, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}
function weekCompletions(c, habitId, d) {
  return weekDays(d).reduce((n, day) => isCompleted(c, habitId, day) ? n + 1 : n, 0);
}
function weeklyTarget(habit) {
  const t = habit.frequency === "daily" ? 7 : habit.goalPerWeek;
  return Math.min(7, Math.max(1, t));
}
const HABIT_COLORS = [
  "#F5C24A",
  "#7DD3FC",
  "#86EFAC",
  "#F472B6",
  "#A78BFA",
  "#FB923C",
  "#34D399",
  "#60A5FA",
  "#F87171",
  "#C084FC"
];
const HABIT_EMOJIS = [
  "💪",
  "📚",
  "🧘",
  "🏃",
  "💧",
  "🥗",
  "😴",
  "✍️",
  "🎯",
  "🧠",
  "🎨",
  "🌱",
  "☀️",
  "🔥",
  "⭐",
  "🎵"
];
const uid = () => Math.random().toString(36).slice(2, 11);
function seed() {
  const habits = [
    { id: uid(), name: "Morning Workout", emoji: "💪", color: HABIT_COLORS[0], frequency: "daily", goalPerWeek: 7, createdAt: (/* @__PURE__ */ new Date()).toISOString(), description: "30 min strength or cardio", category: "Health" },
    { id: uid(), name: "Read 20 pages", emoji: "📚", color: HABIT_COLORS[1], frequency: "daily", goalPerWeek: 7, createdAt: (/* @__PURE__ */ new Date()).toISOString(), category: "Mind" },
    { id: uid(), name: "Meditation", emoji: "🧘", color: HABIT_COLORS[2], frequency: "daily", goalPerWeek: 5, createdAt: (/* @__PURE__ */ new Date()).toISOString(), category: "Mind" },
    { id: uid(), name: "Drink Water 2L", emoji: "💧", color: HABIT_COLORS[3], frequency: "daily", goalPerWeek: 7, createdAt: (/* @__PURE__ */ new Date()).toISOString(), category: "Health" },
    { id: uid(), name: "Side Project", emoji: "✍️", color: HABIT_COLORS[4], frequency: "weekly", goalPerWeek: 4, createdAt: (/* @__PURE__ */ new Date()).toISOString(), category: "Work" }
  ];
  const completions = {};
  const today = /* @__PURE__ */ new Date();
  habits.forEach((h, idx) => {
    completions[h.id] = {};
    for (let i = 0; i < 90; i++) {
      const d = subDays(today, i);
      const p = [0.85, 0.7, 0.6, 0.9, 0.4][idx] ?? 0.6;
      if (Math.random() < p) completions[h.id][dateKey(d)] = true;
    }
  });
  return { habits, completions };
}
const useHabits = create()(
  persist(
    (set, get) => ({
      ...seed(),
      settings: { reminderEnabled: false, reminderTime: "20:00" },
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      addHabit: (h) => set((s) => ({
        habits: [
          ...s.habits,
          {
            ...h,
            id: uid(),
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            emoji: h.emoji || HABIT_EMOJIS[Math.floor(Math.random() * HABIT_EMOJIS.length)],
            color: h.color || HABIT_COLORS[Math.floor(Math.random() * HABIT_COLORS.length)]
          }
        ]
      })),
      updateHabit: (id, patch) => set((s) => ({ habits: s.habits.map((h) => h.id === id ? { ...h, ...patch } : h) })),
      deleteHabit: (id) => set((s) => {
        const { [id]: _, ...rest } = s.completions;
        return { habits: s.habits.filter((h) => h.id !== id), completions: rest };
      }),
      toggleCompletion: (habitId, date) => set((s) => {
        const k = dateKey(date);
        const prev = s.completions[habitId] ?? {};
        const next = { ...prev };
        if (next[k]) delete next[k];
        else next[k] = true;
        return { completions: { ...s.completions, [habitId]: next } };
      }),
      reorderHabits: (ids) => set((s) => ({ habits: ids.map((id) => s.habits.find((h) => h.id === id)).filter(Boolean) })),
      resetAll: () => set({ habits: [], completions: {} }),
      resetCompletions: () => set((s) => ({ completions: Object.fromEntries(s.habits.map((h) => [h.id, {}])) })),
      resetMonth: (year, month) => set((s) => {
        const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
        const next = {};
        for (const [hid, days] of Object.entries(s.completions)) {
          next[hid] = Object.fromEntries(Object.entries(days).filter(([k]) => !k.startsWith(prefix)));
        }
        return { completions: next };
      }),
      importData: (data) => set({
        habits: data.habits ?? [],
        completions: data.completions ?? {},
        settings: data.settings ?? get().settings
      }),
      updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } }))
    }),
    {
      name: "habit-tracker-v1",
      storage: createJSONStorage(() => typeof window !== "undefined" ? localStorage : void 0),
      skipHydration: true
    }
  )
);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function HabitDialog({ open, onOpenChange, habit }) {
  const addHabit = useHabits((s) => s.addHabit);
  const updateHabit = useHabits((s) => s.updateHabit);
  const deleteHabit = useHabits((s) => s.deleteHabit);
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [emoji, setEmoji] = reactExports.useState(HABIT_EMOJIS[0]);
  const [color, setColor] = reactExports.useState(HABIT_COLORS[0]);
  const [frequency, setFrequency] = reactExports.useState("daily");
  const [goalPerWeek, setGoalPerWeek] = reactExports.useState(7);
  const [category, setCategory] = reactExports.useState("");
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto overscroll-contain",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: () => onOpenChange(false),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 10, scale: 0.97 },
          transition: { type: "spring", stiffness: 300, damping: 28 },
          className: "glass rounded-2xl w-full max-w-md p-6 relative my-auto max-h-[90vh] overflow-y-auto overscroll-contain",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => onOpenChange(false),
                className: "absolute right-3 top-3 p-1 rounded-md hover:bg-white/5 text-muted-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-1", children: habit ? "Edit habit" : "Create habit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-5", children: "Make it small. Make it daily." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    placeholder: "e.g. Read 20 pages",
                    autoFocus: true,
                    className: "mt-1 w-full bg-background/60 rounded-lg px-3 py-2 text-sm border border-border outline-none focus:border-gold/50"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: description,
                    onChange: (e) => setDescription(e.target.value),
                    placeholder: "Optional",
                    className: "mt-1 w-full bg-background/60 rounded-lg px-3 py-2 text-sm border border-border outline-none focus:border-gold/50"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Icon" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex flex-wrap gap-1.5", children: HABIT_EMOJIS.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setEmoji(e),
                    className: cn(
                      "h-8 w-8 rounded-lg grid place-items-center text-base transition",
                      emoji === e ? "bg-gold-soft ring-1 ring-gold/60" : "bg-white/5 hover:bg-white/10"
                    ),
                    children: e
                  },
                  e
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Color" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex flex-wrap gap-2", children: HABIT_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setColor(c),
                    className: cn(
                      "h-7 w-7 rounded-full transition",
                      color === c ? "ring-2 ring-offset-2 ring-offset-background ring-gold" : ""
                    ),
                    style: { backgroundColor: c, boxShadow: `0 0 12px ${c}55` }
                  },
                  c
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Frequency" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid grid-cols-2 rounded-lg bg-white/5 p-0.5", children: ["daily", "weekly"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        setFrequency(f);
                        if (f === "daily") setGoalPerWeek(7);
                      },
                      className: cn(
                        "py-1.5 text-xs rounded-md transition capitalize",
                        frequency === f ? "bg-gold text-primary-foreground font-medium" : "text-muted-foreground"
                      ),
                      children: f
                    },
                    f
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Goal / week" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "number",
                      min: 1,
                      max: 7,
                      value: goalPerWeek,
                      onChange: (e) => setGoalPerWeek(Math.min(7, Math.max(1, +e.target.value || 1))),
                      disabled: frequency === "daily",
                      className: "mt-1 w-full bg-background/60 rounded-lg px-3 py-2 text-sm border border-border outline-none focus:border-gold/50 disabled:opacity-50"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: category,
                    onChange: (e) => setCategory(e.target.value),
                    placeholder: "Health, Work, Mind…",
                    className: "mt-1 w-full bg-background/60 rounded-lg px-3 py-2 text-sm border border-border outline-none focus:border-gold/50"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between gap-2", children: [
              habit ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => {
                    deleteHabit(habit.id);
                    onOpenChange(false);
                  },
                  className: "text-xs text-destructive/80 hover:text-destructive px-2 py-1.5",
                  children: "Delete habit"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onOpenChange(false), className: "px-4 py-2 text-sm rounded-lg hover:bg-white/5", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, className: "px-4 py-2 text-sm rounded-lg bg-gold text-primary-foreground font-medium hover:brightness-110", children: habit ? "Save" : "Create" })
              ] })
            ] })
          ]
        }
      )
    }
  ) });
}
function InstallDialog() {
  const [open, setOpen] = reactExports.useState(false);
  const [deferred, setDeferred] = reactExports.useState(null);
  const [installed, setInstalled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if (window.matchMedia?.("(display-mode: standalone)").matches) setInstalled(true);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);
  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  };
  const handleClick = async () => {
    if (deferred) {
      try {
        await deferred.prompt();
        const choice = await deferred.userChoice;
        setDeferred(null);
        if (choice.outcome === "accepted") return;
      } catch {
      }
    }
    setOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleClick,
        className: "w-full flex items-center justify-center gap-1.5 rounded-md bg-neon/15 text-neon hover:bg-neon/25 text-xs py-1.5 transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          " Install app"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4",
        onClick: () => setOpen(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12, scale: 0.98 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 12 },
            onClick: (e) => e.stopPropagation(),
            className: "glass rounded-2xl p-6 max-w-md w-full relative neon-glow",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), className: "absolute top-3 right-3 p-1 rounded text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-neon", children: "Install Habitus" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Use it like a native app — works fully offline once installed." }),
              installed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-lg bg-neon/10 border border-neon/30 px-3 py-2 text-xs text-neon", children: "✓ Habitus is already installed on this device." }),
              deferred && !installed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: install,
                  className: "mt-4 w-full bg-neon text-primary-foreground font-medium py-2.5 rounded-lg hover:brightness-110 transition",
                  children: "Install now"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Step, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-4 w-4" }), title: "Desktop (Chrome / Edge)", children: [
                  "Click the ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-neon", children: "install icon" }),
                  " in the address bar, or open the browser menu → ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Install Habitus…" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Step, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Apple, { className: "h-4 w-4" }), title: "iPhone / iPad (Safari)", children: [
                  "Tap the ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-neon", children: "Share" }),
                  " button → ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Add to Home Screen" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Step, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-4 w-4" }), title: "Android (Chrome)", children: [
                  "Tap the ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-neon", children: "⋮ menu" }),
                  " → ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Install app" }),
                  " or ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Add to Home screen" }),
                  "."
                ] })
              ] })
            ]
          }
        )
      }
    ) })
  ] });
}
function Step({ icon, title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-white/5 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-neon text-xs font-semibold", children: [
      icon,
      " ",
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground leading-relaxed", children })
  ] });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const AlertDialog = Root2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
const useAuth = create((set) => ({
  user: null,
  ready: false,
  syncStatus: "idle",
  pendingCount: 0,
  lastSyncedAt: null,
  setUser: (user) => set({ user }),
  setReady: (ready) => set({ ready }),
  setSync: (patch) => set(patch)
}));
const firebaseConfig = {
  apiKey: "AIzaSyAYAL_vvVj7azFLvts_jghy0sYQ5QQAhEk",
  authDomain: "habit-tracker-650c7.firebaseapp.com",
  projectId: "habit-tracker-650c7",
  storageBucket: "habit-tracker-650c7.firebasestorage.app",
  messagingSenderId: "1071000930328",
  appId: "1:1071000930328:web:af7c93628ea9d751cd9b6d",
  measurementId: "G-PW01KLKZJN"
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = typeof window !== "undefined" ? getAuth(app) : null;
const db = typeof window !== "undefined" ? getFirestore(app) : null;
new GoogleAuthProvider();
async function signInWithGoogle() {
  return signInWithPopup();
}
async function signOutUser() {
  return signOut(auth);
}
function timeAgo(ts) {
  if (!ts) return "never";
  const s = Math.floor((Date.now() - ts) / 1e3);
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function SyncStatus() {
  const user = useAuth((s) => s.user);
  const status = useAuth((s) => s.syncStatus);
  const pending = useAuth((s) => s.pendingCount);
  const lastSyncedAt = useAuth((s) => s.lastSyncedAt);
  const [, force] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const i = setInterval(() => force((n) => n + 1), 15e3);
    return () => clearInterval(i);
  }, []);
  if (!user) return null;
  const meta = {
    loading: { Icon: RefreshCw, color: "text-gold", label: "Loading…", spin: true },
    syncing: { Icon: RefreshCw, color: "text-gold", label: "Syncing…", spin: true },
    pending: { Icon: Clock, color: "text-gold", label: "Pending", spin: false },
    synced: { Icon: CircleCheck, color: "text-emerald-400", label: "Up to date", spin: false },
    error: { Icon: TriangleAlert, color: "text-destructive", label: "Sync error", spin: false },
    offline: { Icon: CloudOff, color: "text-muted-foreground", label: "Offline", spin: false },
    idle: { Icon: Cloud, color: "text-muted-foreground", label: "Idle", spin: false }
  }[status];
  const { Icon, color, label, spin } = meta;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-white/5 px-2.5 py-2 flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-3.5 w-3.5 shrink-0", color, spin && "animate-spin") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-[11px] font-medium leading-tight", color), children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground leading-tight truncate", children: [
        "Synced ",
        timeAgo(lastSyncedAt),
        pending > 0 && ` · ${pending} queued`
      ] })
    ] })
  ] });
}
function AuthButton() {
  const user = useAuth((s) => s.user);
  const ready = useAuth((s) => s.ready);
  const pending = useAuth((s) => s.pendingCount);
  const [confirmOpen, setConfirmOpen] = reactExports.useState(false);
  if (!ready) return null;
  if (user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-white/5 p-2.5 flex items-center gap-2", children: [
        user.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.photoURL, alt: "", className: "h-8 w-8 rounded-full ring-1 ring-border" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-gold/20 grid place-items-center text-xs font-semibold text-gold", children: (user.displayName || user.email || "U")[0]?.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium truncate", children: user.displayName || "Signed in" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground truncate", children: user.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SyncStatus, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setConfirmOpen(true),
          className: "w-full flex items-center justify-center gap-1.5 rounded-md bg-white/5 hover:bg-destructive/10 hover:text-destructive text-muted-foreground text-xs py-1.5 transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }),
            " Sign out"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: confirmOpen, onOpenChange: setConfirmOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            " Sign out of Google?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: pending > 0 ? `You have ${pending} unsynced change${pending === 1 ? "" : "s"}. Sign out anyway?` : "Your cloud data stays safe. You can sign back in any time to restore it." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogAction,
            {
              onClick: async () => {
                try {
                  await signOutUser();
                  toast.success("Signed out");
                } catch {
                  toast.error("Sign out failed");
                }
              },
              children: "Sign out"
            }
          )
        ] })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: async () => {
        try {
          await signInWithGoogle();
          toast.success("Signed in", { description: "Your habits will sync to the cloud." });
        } catch (e) {
          toast.error("Sign in failed", { description: e?.message ?? "Try again." });
        }
      },
      className: "w-full flex items-center justify-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs py-2 transition border border-border",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-3.5 w-3.5 text-gold" }),
        " Sign in with Google"
      ]
    }
  );
}
function SidebarControls() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  const settings = useHabits((s) => s.settings);
  const updateSettings = useHabits((s) => s.updateSettings);
  const resetAll = useHabits((s) => s.resetAll);
  const importData = useHabits((s) => s.importData);
  const [resetOpen, setResetOpen] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const totalCheckins = Object.values(completions).reduce(
    (acc, m) => acc + Object.values(m).filter(Boolean).length,
    0
  );
  const exportJson = () => {
    const blob = new Blob(
      [JSON.stringify({ habits, completions, settings, exportedAt: (/* @__PURE__ */ new Date()).toISOString() }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `habits-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const importJson = (file) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AuthButton, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportJson, className: "flex items-center justify-center gap-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs py-1.5 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
        " Export"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => fileRef.current?.click(), className: "flex items-center justify-center gap-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs py-1.5 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
        " Import"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileRef,
          type: "file",
          accept: "application/json",
          className: "hidden",
          onChange: (e) => e.target.files?.[0] && importJson(e.target.files[0])
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-white/5 p-2.5 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5 text-gold" }),
          " Daily reminder"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => settings.reminderEnabled ? updateSettings({ reminderEnabled: false }) : requestNotif(),
            className: cn(
              "h-4 w-7 rounded-full transition relative",
              settings.reminderEnabled ? "bg-gold" : "bg-white/15"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
              "absolute top-0.5 h-3 w-3 rounded-full bg-background transition-all",
              settings.reminderEnabled ? "left-3.5" : "left-0.5"
            ) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "time",
            value: settings.reminderTime,
            onChange: (e) => updateSettings({ reminderTime: e.target.value }),
            className: "flex-1 bg-background/60 rounded-md px-2 py-1 text-xs border border-border outline-none focus:border-gold/50"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: async () => {
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
            },
            className: "text-[10px] px-2 py-1 rounded-md bg-gold/15 text-gold hover:bg-gold/25 transition",
            title: "Send a test notification",
            children: "Test"
          }
        )
      ] }),
      settings.reminderEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
        "Notification will fire at ",
        settings.reminderTime,
        " while the app is open."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InstallDialog, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setResetOpen(true),
        className: "w-full flex items-center justify-center gap-1.5 rounded-md text-destructive/80 hover:text-destructive hover:bg-destructive/10 text-xs py-1.5 transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          " Reset data"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] text-muted-foreground px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        habits.length,
        " habits"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        totalCheckins,
        " check-ins"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: resetOpen, onOpenChange: setResetOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }),
          "Delete all data?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This permanently removes every habit, check-in, and setting on this device. This cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: () => {
              resetAll();
              toast.success("Data reset", { description: "Your slate is clean." });
            },
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: "Delete everything"
          }
        )
      ] })
    ] }) })
  ] });
}
const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/heatmap", label: "Heatmap", icon: Flame },
  { to: "/analytics", label: "Analytics", icon: ChartColumn }
];
function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex w-72 shrink-0 flex-col gap-4 border-r border-border bg-surface/40 backdrop-blur-xl p-4 h-screen sticky top-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-1 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: logo,
          alt: "Habits logo",
          width: 44,
          height: 44,
          className: "h-11 w-11 rounded-2xl object-cover ring-1 ring-border shadow-sm"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-semibold tracking-tight text-sage", children: "Habits" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "A calmer journey" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1", children: navItems.map((n) => {
      const active = pathname === n.to;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: n.to,
          className: cn(
            "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            active ? "text-gold bg-gold-soft" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-4 w-4" }),
            n.label,
            active && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                layoutId: "sb-active",
                className: "absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-gold"
              }
            )
          ]
        },
        n.to
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setDialogOpen(true),
        className: "w-full flex items-center justify-center gap-2 rounded-lg bg-gold text-primary-foreground text-sm font-medium py-2 hover:brightness-110 transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " New Habit"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarControls, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HabitDialog, { open: dialogOpen, onOpenChange: setDialogOpen })
  ] });
}
const Sheet = Root;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
const items = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/calendar", label: "Cal", icon: CalendarDays },
  { to: "/heatmap", label: "Heat", icon: Flame },
  { to: "/analytics", label: "Stats", icon: ChartColumn }
];
function MobileNav() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [open, setOpen] = reactExports.useState(false);
  const [settingsOpen, setSettingsOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Habits", width: 32, height: 32, className: "h-8 w-8 rounded-lg object-cover ring-1 ring-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold tracking-tight text-sage", children: "Habits" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSettingsOpen(true),
            className: "h-8 w-8 grid place-items-center rounded-lg bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition",
            "aria-label": "Settings",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setOpen(true),
            className: "h-8 px-3 rounded-lg bg-neon text-primary-foreground text-xs font-medium flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              " New"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "md:hidden fixed bottom-0 inset-x-0 z-30 bg-background/85 backdrop-blur-xl border-t border-border pb-[env(safe-area-inset-bottom)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-4", children: items.map((it) => {
      const active = pathname === it.to;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: it.to,
          className: cn(
            "flex flex-col items-center gap-0.5 py-2.5 text-[10px] transition",
            active ? "text-neon" : "text-muted-foreground"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: cn("h-5 w-5", active && "drop-shadow-[0_0_8px_var(--neon)]") }),
            it.label
          ]
        }
      ) }, it.to);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HabitDialog, { open, onOpenChange: setOpen }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: settingsOpen, onOpenChange: setSettingsOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-[88vw] sm:max-w-sm overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-2 text-sage", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
          " Settings"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Backups, reminders, install, and data." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarControls, {}) })
    ] }) })
  ] });
}
function useHydrateStore() {
  const hydrated = useHabits((s) => s.hydrated);
  reactExports.useEffect(() => {
    if (hydrated) return;
    useHabits.persist.rehydrate()?.then?.(() => useHabits.getState().setHydrated(true));
    setTimeout(() => useHabits.getState().setHydrated(true), 0);
  }, [hydrated]);
  return hydrated;
}
function useReminderScheduler() {
  const enabled = useHabits((s) => s.settings.reminderEnabled);
  const time = useHabits((s) => s.settings.reminderTime);
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  reactExports.useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined" || !("Notification" in window)) return;
    const tick = () => {
      if (Notification.permission !== "granted") return;
      const now = /* @__PURE__ */ new Date();
      const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      if (hhmm !== time) return;
      const today = dateKey(now);
      const lastKey = "habitus-last-reminder";
      if (localStorage.getItem(lastKey) === today) return;
      localStorage.setItem(lastKey, today);
      const todayKey = dateKey(now);
      const remaining = habits.filter((h) => !completions[h.id]?.[todayKey]).length;
      const body = remaining ? `You have ${remaining} habit${remaining > 1 ? "s" : ""} left for today.` : "All habits done today. Keep the streak alive!";
      new Notification("Habitus — Daily check-in", {
        body,
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        tag: "habitus-daily"
      });
    };
    tick();
    const id = window.setInterval(tick, 3e4);
    return () => window.clearInterval(id);
  }, [enabled, time, habits, completions]);
}
function useRegisterSW() {
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    const inIframe = (() => {
      try {
        return window.self !== window.top;
      } catch {
        return true;
      }
    })();
    const host = window.location.hostname;
    const isPreview = host.includes("id-preview--") || host.includes("lovableproject.com") || host === "localhost" || host === "127.0.0.1";
    if (inIframe || isPreview) {
      navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister())).catch(() => {
      });
      return;
    }
    navigator.serviceWorker.register("/sw.js").catch((err) => console.warn("SW register failed", err));
  }, []);
}
function useFirebaseSync() {
  const setUser = useAuth((s) => s.setUser);
  const setReady = useAuth((s) => s.setReady);
  const setSync = useAuth((s) => s.setSync);
  const syncingRef = reactExports.useRef(false);
  const currentUidRef = reactExports.useRef(null);
  const pendingRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || !auth) return;
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setReady(true);
      if (user) {
        if (currentUidRef.current === user.uid) return;
        currentUidRef.current = user.uid;
        syncingRef.current = true;
        setSync({ syncStatus: "loading", pendingCount: 0 });
        useHabits.getState().resetAll();
        try {
          const [habitsSnap, compsSnap] = await Promise.all([
            getDocs(collection(db, "users", user.uid, "habits")),
            getDocs(collection(db, "users", user.uid, "completions"))
          ]);
          const habits = habitsSnap.docs.map((d) => d.data()).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          const completions = {};
          compsSnap.forEach((d) => {
            completions[d.id] = d.data().days ?? {};
          });
          useHabits.getState().importData({ habits, completions });
          setSync({ syncStatus: "synced", lastSyncedAt: Date.now() });
        } catch (e) {
          console.error("Cloud load failed", e);
          setSync({ syncStatus: "error" });
        } finally {
          syncingRef.current = false;
        }
      } else {
        currentUidRef.current = null;
        setSync({ syncStatus: "idle", pendingCount: 0, lastSyncedAt: null });
      }
    });
    return unsub;
  }, [setUser, setReady, setSync]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const onOffline = () => {
      if (currentUidRef.current) setSync({ syncStatus: "offline" });
    };
    const onOnline = () => {
      if (currentUidRef.current && pendingRef.current === 0) setSync({ syncStatus: "synced" });
    };
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, [setSync]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    let timer = null;
    let lastHabits = useHabits.getState().habits;
    let lastCompletions = useHabits.getState().completions;
    const unsub = useHabits.subscribe((state) => {
      const uid2 = currentUidRef.current;
      if (!uid2 || syncingRef.current) {
        lastHabits = state.habits;
        lastCompletions = state.completions;
        return;
      }
      if (state.habits === lastHabits && state.completions === lastCompletions) return;
      const prevHabits = lastHabits;
      const prevCompletions = lastCompletions;
      lastHabits = state.habits;
      lastCompletions = state.completions;
      pendingRef.current += 1;
      setSync({ syncStatus: "pending", pendingCount: pendingRef.current });
      if (timer) clearTimeout(timer);
      timer = setTimeout(async () => {
        const inFlight = pendingRef.current;
        setSync({ syncStatus: "syncing" });
        try {
          const batch = writeBatch(db);
          const prevIds = new Set(prevHabits.map((h) => h.id));
          const nextIds = new Set(state.habits.map((h) => h.id));
          state.habits.forEach((h, idx) => {
            batch.set(doc(db, "users", uid2, "habits", h.id), { ...h, order: idx });
          });
          prevIds.forEach((id) => {
            if (!nextIds.has(id)) batch.delete(doc(db, "users", uid2, "habits", id));
          });
          Object.entries(state.completions).forEach(([habitId, days]) => {
            if (prevCompletions[habitId] !== days) {
              batch.set(doc(db, "users", uid2, "completions", habitId), { days });
            }
          });
          Object.keys(prevCompletions).forEach((habitId) => {
            if (!(habitId in state.completions)) {
              batch.delete(doc(db, "users", uid2, "completions", habitId));
            }
          });
          await batch.commit();
          pendingRef.current = Math.max(0, pendingRef.current - inFlight);
          setSync({
            syncStatus: pendingRef.current > 0 ? "pending" : "synced",
            pendingCount: pendingRef.current,
            lastSyncedAt: Date.now()
          });
        } catch (e) {
          console.error("Cloud sync failed", e);
          setSync({ syncStatus: "error" });
        }
      }, 600);
    });
    return () => {
      unsub();
      if (timer) clearTimeout(timer);
    };
  }, [setSync]);
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-gold", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "This page doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "mt-6 inline-block rounded-md bg-gold px-4 py-2 text-sm font-medium text-primary-foreground", children: "Go home" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  console.error(error);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-5 rounded-md bg-gold px-4 py-2 text-sm font-medium text-primary-foreground",
        children: "Try again"
      }
    )
  ] }) });
}
const Route$4 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Habitus — Offline Habit Tracker" },
      { name: "description", content: "Build better habits with a beautiful offline-first habit tracker. Track streaks, view heatmaps, and analyze your progress." },
      { name: "theme-color", content: "#15091f" },
      { property: "og:title", content: "Habitus — Offline Habit Tracker" },
      { property: "og:description", content: "Build better habits with a beautiful offline-first habit tracker. Track streaks, view heatmaps, and analyze your progress." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Habitus — Offline Habit Tracker" },
      { name: "twitter:description", content: "Build better habits with a beautiful offline-first habit tracker. Track streaks, view heatmaps, and analyze your progress." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/qVQpG1fMqwfqGPlHAif3bBY3goS2/social-images/social-1779982651088-HABIT_TRACKER.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/qVQpG1fMqwfqGPlHAif3bBY3goS2/social-images/social-1779982651088-HABIT_TRACKER.webp" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "icon", href: "/icon-192.png", type: "image/png" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$4.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, {}) });
}
function AppShell() {
  const hydrated = useHydrateStore();
  if (!hydrated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center min-h-screen text-sm text-muted-foreground", children: "Loading…" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShellInner, {});
}
function AppShellInner() {
  useReminderScheduler();
  useRegisterSW();
  useFirebaseSync();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 min-w-0 pb-20 md:pb-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", theme: "dark", richColors: true, closeButton: true })
  ] });
}
const $$splitComponentImporter$3 = () => import("./heatmap-Bs9rGX2l.mjs");
const Route$3 = createFileRoute("/heatmap")({
  head: () => ({
    meta: [{
      title: "Heatmap — Habits"
    }, {
      name: "description",
      content: "Contribution heatmap of your habit completions."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./calendar-DxnC2Bcl.mjs");
const Route$2 = createFileRoute("/calendar")({
  head: () => ({
    meta: [{
      title: "Calendar — Habitus"
    }, {
      name: "description",
      content: "Monthly calendar view of your habit completions."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./analytics-DQ179sow.mjs");
const Route$1 = createFileRoute("/analytics")({
  head: () => ({
    meta: [{
      title: "Analytics — Habitus"
    }, {
      name: "description",
      content: "Insights, trends, and your productivity score."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-UutSM9pZ.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Dashboard — Habitus"
    }, {
      name: "description",
      content: "Track your daily habits, streaks and monthly completion at a glance."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const HeatmapRoute = Route$3.update({
  id: "/heatmap",
  path: "/heatmap",
  getParentRoute: () => Route$4
});
const CalendarRoute = Route$2.update({
  id: "/calendar",
  path: "/calendar",
  getParentRoute: () => Route$4
});
const AnalyticsRoute = Route$1.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => Route$4
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  AnalyticsRoute,
  CalendarRoute,
  HeatmapRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  AlertDialog as A,
  Button as B,
  HabitDialog as H,
  AlertDialogAction as a,
  AlertDialogCancel as b,
  AlertDialogContent as c,
  AlertDialogDescription as d,
  AlertDialogFooter as e,
  AlertDialogHeader as f,
  AlertDialogTitle as g,
  bestStreak as h,
  cn as i,
  completionRate as j,
  currentStreak as k,
  dateKey as l,
  isCompleted as m,
  weeklyTarget as n,
  router as r,
  useHabits as u,
  weekCompletions as w
};
