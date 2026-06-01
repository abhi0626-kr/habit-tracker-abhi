import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useHabits, h as bestStreak, k as currentStreak, m as isCompleted, i as cn, j as completionRate, l as dateKey, H as HabitDialog, A as AlertDialog, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction, B as Button, w as weekCompletions, n as weeklyTarget } from "./router-CRMUO_0X.mjs";
import { R as Root, P as Portal, a as Content, C as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/sonner.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import { e as eachDayOfInterval, c as endOfMonth, s as startOfMonth, i as isFuture, g as format, b as addMonths, l as isToday, j as isSameDay, n as startOfYear } from "../_libs/date-fns.mjs";
import { P as Pencil, l as RotateCcw, c as ChevronLeft, d as ChevronRight, F as Flame, s as Trophy, T as Target, e as CircleCheck, G as GripVertical, n as Sparkles, X } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/zustand.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/class-variance-authority.mjs";
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
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const NAME_KEY = "habitus.userName";
function DashboardPage() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  const toggle = useHabits((s) => s.toggleCompletion);
  const reorderHabits = useHabits((s) => s.reorderHabits);
  const resetMonth = useHabits((s) => s.resetMonth);
  const [cursor, setCursor] = reactExports.useState(/* @__PURE__ */ new Date());
  const [editing, setEditing] = reactExports.useState();
  const [resetOpen, setResetOpen] = reactExports.useState(false);
  const [dragId, setDragId] = reactExports.useState(null);
  const [overId, setOverId] = reactExports.useState(null);
  const [userName, setUserName] = reactExports.useState("");
  const [nameDraft, setNameDraft] = reactExports.useState("");
  const [nameDialogOpen, setNameDialogOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(NAME_KEY) : null;
    if (stored) setUserName(stored);
    else setNameDialogOpen(true);
  }, []);
  const saveName = () => {
    const trimmed = nameDraft.trim().slice(0, 40);
    if (!trimmed) return;
    localStorage.setItem(NAME_KEY, trimmed);
    setUserName(trimmed);
    setNameDialogOpen(false);
    setNameDraft("");
  };
  const monthDays = reactExports.useMemo(() => eachDayOfInterval({
    start: startOfMonth(cursor),
    end: endOfMonth(cursor)
  }), [cursor]);
  const stats = reactExports.useMemo(() => {
    const today = /* @__PURE__ */ new Date();
    let totalCheckins = 0;
    let best = 0;
    let bestCurrent = 0;
    habits.forEach((h) => {
      totalCheckins += Object.values(completions[h.id] ?? {}).filter(Boolean).length;
      best = Math.max(best, bestStreak(completions, h.id));
      bestCurrent = Math.max(bestCurrent, currentStreak(completions, h.id, today));
    });
    let monthDone = 0, monthExpected = 0;
    habits.forEach((h) => {
      monthDays.forEach((d) => {
        if (isFuture(d)) return;
        monthExpected += h.frequency === "daily" ? 1 : h.goalPerWeek / 7;
        if (isCompleted(completions, h.id, d)) monthDone++;
      });
    });
    const monthPct = monthExpected ? Math.round(monthDone / monthExpected * 100) : 0;
    return {
      totalCheckins,
      best,
      bestCurrent,
      monthPct
    };
  }, [habits, completions, monthDays]);
  const dailyScore = (d) => {
    if (!habits.length || isFuture(d)) return 0;
    const done = habits.filter((h) => isCompleted(completions, h.id, d)).length;
    return Math.round(done / habits.length * 100);
  };
  const finishDrag = () => {
    setDragId(null);
    setOverId(null);
  };
  const reorderByDrop = (targetId) => {
    if (!dragId || dragId === targetId) {
      finishDrag();
      return;
    }
    const ids = habits.map((h) => h.id);
    const fromIndex = ids.indexOf(dragId);
    const toIndex = ids.indexOf(targetId);
    if (fromIndex < 0 || toIndex < 0) {
      finishDrag();
      return;
    }
    ids.splice(toIndex, 0, ids.splice(fromIndex, 1)[0]);
    reorderHabits(ids);
    finishDrag();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 md:p-8 space-y-6 max-w-[1400px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: [
          greetingFor(/* @__PURE__ */ new Date()),
          userName ? `, ${userName}` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl md:text-3xl font-semibold tracking-tight mt-1 flex items-center gap-2", children: [
          format(/* @__PURE__ */ new Date(), "EEEE, MMMM d"),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setNameDraft(userName);
            setNameDialogOpen(true);
          }, className: "text-muted-foreground hover:text-foreground transition", title: "Edit your name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setResetOpen(true), className: "glass rounded-xl px-3 py-2 text-xs font-medium flex items-center gap-1.5 hover:border-destructive/40 hover:text-destructive transition", title: "Reset this month's check-ins", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
          " Reset month"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 glass rounded-xl p-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCursor((d) => addMonths(d, -1)), className: "p-2 rounded-lg hover:bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCursor(/* @__PURE__ */ new Date()), className: "px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-white/5", children: "Today" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1.5 text-sm font-medium min-w-[120px] text-center", children: format(cursor, "MMMM yyyy") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCursor((d) => addMonths(d, 1)), className: "p-2 rounded-lg hover:bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4" }), label: "Current streak", value: `${stats.bestCurrent}`, suffix: "days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }), label: "Best streak", value: `${stats.best}`, suffix: "days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4" }), label: "This month", value: `${stats.monthPct}%`, progress: stats.monthPct }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }), label: "Total check-ins", value: `${stats.totalCheckins}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass rounded-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Habit tracker" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tap circles to mark complete" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          habits.length,
          " habits · ",
          monthDays.length,
          " days"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto scrollbar-thin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "sticky left-0 z-10 bg-surface/80 backdrop-blur text-left font-medium px-5 py-3 min-w-[200px]", children: "Habit" }),
          monthDays.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { className: cn("px-1 py-3 font-medium text-center w-9", isToday(d) && "text-gold"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: format(d, "EEEEE") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground/70", children: format(d, "d") })
          ] }, d.toISOString())),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-right", children: "%" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          habits.map((h) => {
            const rate = completionRate(completions, h, startOfMonth(cursor), monthDays[monthDays.length - 1] < /* @__PURE__ */ new Date() ? endOfMonth(cursor) : /* @__PURE__ */ new Date());
            const dragging = dragId === h.id;
            const over = overId === h.id && dragId && dragId !== h.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { draggable: true, onDragStart: (e) => {
              setDragId(h.id);
              e.dataTransfer.effectAllowed = "move";
            }, onDragOver: (e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              if (overId !== h.id) setOverId(h.id);
            }, onDragLeave: () => {
              if (overId === h.id) setOverId(null);
            }, onDrop: (e) => {
              e.preventDefault();
              reorderByDrop(h.id);
            }, onDragEnd: finishDrag, className: cn("border-t border-border/60 group transition-colors cursor-grab active:cursor-grabbing", dragging && "opacity-50", over && "bg-gold/5"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: cn("sticky left-0 z-10 bg-surface/80 backdrop-blur px-5 py-2", over && "bg-surface/90"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4 text-muted-foreground/40 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full shrink-0", style: {
                  backgroundColor: h.color,
                  boxShadow: `0 0 8px ${h.color}66`
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: h.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: h.name }),
                  h.category && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: h.category })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(h), className: "opacity-0 group-hover:opacity-100 ml-1 p-1 rounded text-muted-foreground hover:text-foreground transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }) })
              ] }) }),
              monthDays.map((d) => {
                const done = isCompleted(completions, h.id, d);
                const future = isFuture(d) && !isSameDay(d, /* @__PURE__ */ new Date());
                return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-center px-0.5 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: future, onClick: () => toggle(h.id, d), className: cn("h-7 w-7 rounded-full grid place-items-center transition", done ? "scale-100" : "bg-white/[0.04] hover:bg-white/[0.08] border border-border", future && "opacity-20 cursor-not-allowed", isToday(d) && !done && "ring-1 ring-gold/40"), style: done ? {
                  backgroundColor: h.color,
                  boxShadow: `0 0 12px ${h.color}80`
                } : void 0, children: done && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-black/70" }) }) }, d.toISOString());
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-gold", children: [
                rate,
                "%"
              ] }) })
            ] }, h.id);
          }),
          habits.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: monthDays.length + 2, className: "text-center py-12 text-sm text-muted-foreground", children: "No habits yet — create one in the sidebar." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60 bg-white/[0.02]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "sticky left-0 z-10 bg-surface/80 backdrop-blur px-5 py-2 text-xs text-muted-foreground font-medium", children: "Daily score" }),
            monthDays.map((d) => {
              const score = dailyScore(d);
              return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-center px-0.5 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-7 mx-auto rounded-md grid place-items-center text-[10px] font-mono", style: {
                backgroundColor: score ? `color-mix(in oklab, var(--gold) ${score}%, transparent)` : "transparent",
                color: score > 50 ? "rgba(0,0,0,0.7)" : "var(--muted-foreground)"
              }, children: score || "" }) }, dateKey(d));
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", {})
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyGoals, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(YearProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HabitDialog, { open: !!editing, onOpenChange: (o) => !o && setEditing(void 0), habit: editing }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: resetOpen, onOpenChange: setResetOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4 text-destructive" }),
          "Reset ",
          format(cursor, "MMMM yyyy"),
          "?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will clear every check-in for this month across all your habits. This action can't be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => resetMonth(cursor.getFullYear(), cursor.getMonth()), className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Reset month" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: nameDialogOpen, onOpenChange: (o) => {
      if (userName || !o) setNameDialogOpen(o);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-gold" }),
          userName ? "Update your name" : "Welcome to Habitus"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: userName ? "Change how you're greeted on your dashboard." : "What should we call you? We'll greet you here every day." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        saveName();
      }, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, maxLength: 40, placeholder: "Your name", value: nameDraft, onChange: (e) => setNameDraft(e.target.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: !nameDraft.trim(), className: "bg-gold text-primary-foreground hover:bg-gold/90", children: userName ? "Save" : "Let's go" }) })
      ] })
    ] }) })
  ] });
}
function greetingFor(d) {
  const h = d.getHours();
  if (h < 5) return "Late night";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}
function StatCard({
  icon,
  label,
  value,
  suffix,
  progress
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "glass glass-hover rounded-xl p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-baseline gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-semibold tracking-tight", children: value }),
      suffix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: suffix })
    ] }),
    progress !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      width: 0
    }, animate: {
      width: `${progress}%`
    }, transition: {
      duration: 0.8,
      ease: "easeOut"
    }, className: "h-full bg-gold rounded-full" }) })
  ] });
}
function WeeklyGoals() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  const today = /* @__PURE__ */ new Date();
  if (!habits.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "This week's goals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Progress toward each habit's weekly target." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: [
        "Week of ",
        format(startOfWeekMon(today), "MMM d")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2.5 sm:grid-cols-2", children: habits.map((h) => {
      const done = weekCompletions(completions, h.id, today);
      const target = weeklyTarget(h);
      const pct = Math.min(100, Math.round(done / target * 100));
      const hit = done >= target;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl bg-white/[0.03] border border-border px-3 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full shrink-0", style: {
            backgroundColor: h.color,
            boxShadow: `0 0 8px ${h.color}66`
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: h.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate flex-1", children: h.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("text-xs font-mono", hit ? "text-gold" : "text-muted-foreground"), children: [
            done,
            "/",
            target
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          width: 0
        }, animate: {
          width: `${pct}%`
        }, transition: {
          duration: 0.7,
          ease: "easeOut"
        }, className: cn("h-full rounded-full", hit ? "bg-gradient-to-r from-gold/70 to-gold" : "bg-gold/60") }) })
      ] }, h.id);
    }) })
  ] });
}
function startOfWeekMon(d) {
  const day = (d.getDay() + 6) % 7;
  const out = new Date(d);
  out.setDate(d.getDate() - day);
  out.setHours(0, 0, 0, 0);
  return out;
}
function YearProgress() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  const yearDone = reactExports.useMemo(() => {
    const start = startOfYear(/* @__PURE__ */ new Date());
    const today = /* @__PURE__ */ new Date();
    let done = 0, total = 0;
    habits.forEach((h) => {
      eachDayOfInterval({
        start,
        end: today
      }).forEach((d) => {
        total++;
        if (isCompleted(completions, h.id, d)) done++;
      });
    });
    return {
      done,
      total,
      pct: total ? Math.round(done / total * 100) : 0
    };
  }, [habits, completions]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold", children: [
        "Year progress · ",
        format(/* @__PURE__ */ new Date(), "yyyy")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        yearDone.done,
        " / ",
        yearDone.total,
        " check-ins"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      width: 0
    }, animate: {
      width: `${yearDone.pct}%`
    }, transition: {
      duration: 1
    }, className: "h-full bg-gradient-to-r from-gold/60 to-gold rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-right text-xs text-gold font-mono", children: [
      yearDone.pct,
      "%"
    ] })
  ] });
}
export {
  DashboardPage as component
};
