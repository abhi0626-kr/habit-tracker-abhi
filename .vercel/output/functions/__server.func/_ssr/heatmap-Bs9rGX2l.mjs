import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useHabits, l as dateKey, m as isCompleted, w as weekCompletions, n as weeklyTarget, i as cn } from "./router-CRMUO_0X.mjs";
import "../_libs/sonner.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import { m as startOfWeek, o as subDays, e as eachDayOfInterval, h as getDay, g as format, i as isFuture } from "../_libs/date-fns.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { X, e as CircleCheck } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function HeatmapPage() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  const [filter, setFilter] = reactExports.useState("all");
  const [hover, setHover] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  const {
    weeks,
    monthLabels,
    counts
  } = reactExports.useMemo(() => {
    const today = /* @__PURE__ */ new Date();
    const end = today;
    const start = startOfWeek(subDays(end, 53 * 7), {
      weekStartsOn: 1
    });
    const days = eachDayOfInterval({
      start,
      end
    });
    const counts2 = {};
    days.forEach((d) => {
      const k = dateKey(d);
      let c = 0;
      const list = filter === "all" ? habits : habits.filter((h) => h.id === filter);
      list.forEach((h) => {
        if (isCompleted(completions, h.id, d)) c++;
      });
      counts2[k] = c;
    });
    const weeks2 = [];
    let week = Array(7).fill(null);
    days.forEach((d) => {
      const idx = (getDay(d) + 6) % 7;
      week[idx] = d;
      if (idx === 6) {
        weeks2.push(week);
        week = Array(7).fill(null);
      }
    });
    if (week.some(Boolean)) weeks2.push(week);
    const monthLabels2 = [];
    let lastMonth = -1;
    weeks2.forEach((w, i) => {
      const firstReal = w.find(Boolean);
      if (firstReal && firstReal.getMonth() !== lastMonth) {
        monthLabels2.push({
          col: i,
          label: format(firstReal, "MMM")
        });
        lastMonth = firstReal.getMonth();
      }
    });
    return {
      weeks: weeks2,
      monthLabels: monthLabels2,
      counts: counts2
    };
  }, [habits, completions, filter]);
  const max = filter === "all" ? Math.max(1, habits.length) : 1;
  const level = (n) => {
    if (!n) return 0;
    const r = n / max;
    if (r < 0.25) return 1;
    if (r < 0.5) return 2;
    if (r < 0.75) return 3;
    return 4;
  };
  const colors = ["var(--heat-0)", "var(--heat-1)", "var(--heat-2)", "var(--heat-3)", "var(--heat-4)"];
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const selectedHabits = reactExports.useMemo(() => {
    if (!selected) return null;
    const list = filter === "all" ? habits : habits.filter((h) => h.id === filter);
    return list.map((h) => ({
      habit: h,
      done: isCompleted(completions, h.id, selected)
    }));
  }, [selected, habits, completions, filter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 md:p-8 space-y-6 max-w-[1200px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Heatmap" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl md:text-3xl font-semibold tracking-tight mt-1 text-sage", children: [
          total,
          " contributions in the last year"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "glass rounded-lg px-3 py-2 pr-8 text-sm outline-none border-border bg-background text-foreground [&>option]:bg-background [&>option]:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All habits" }),
        habits.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: h.id, children: [
          h.emoji,
          " ",
          h.name
        ] }, h.id))
      ] })
    ] }),
    habits.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "This week's goals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Mon–Sun" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2 sm:grid-cols-2", children: (filter === "all" ? habits : habits.filter((h) => h.id === filter)).map((h) => {
        const done = weekCompletions(completions, h.id, /* @__PURE__ */ new Date());
        const target = weeklyTarget(h);
        const pct = Math.min(100, Math.round(done / target * 100));
        const hit = done >= target;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl bg-foreground/[0.02] border border-border px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full shrink-0", style: {
              backgroundColor: h.color,
              boxShadow: `0 0 8px ${h.color}66`
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: h.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate flex-1", children: h.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("text-xs font-mono", hit ? "text-neon" : "text-muted-foreground"), children: [
              done,
              "/",
              target
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-full rounded-full transition-all", hit ? "bg-neon" : "bg-neon/60"), style: {
            width: `${pct}%`
          } }) })
        ] }, h.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-5 overflow-x-auto scrollbar-thin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-block min-w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-[3px] text-[10px] text-muted-foreground ml-7 mb-1 relative h-3", children: monthLabels.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute", style: {
        left: m.col * 15
      }, children: m.label }, m.col)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-[3px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-[3px] text-[9px] text-muted-foreground mr-1 w-5", children: ["Mon", "", "Wed", "", "Fri", "", "Sun"].map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 flex items-center", children: d }, i)) }),
        weeks.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-[3px]", children: w.map((d, j) => {
          if (!d) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3" }, j);
          const k = dateKey(d);
          const n = counts[k] ?? 0;
          const lv = level(n);
          const future = isFuture(d);
          const isSel = selected && dateKey(selected) === k;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.button, { type: "button", disabled: future, initial: {
            opacity: 0,
            scale: 0.7
          }, animate: {
            opacity: future ? 0.15 : 1,
            scale: 1
          }, transition: {
            duration: 0.25,
            delay: i * 5e-3
          }, onMouseEnter: () => setHover(k), onMouseLeave: () => setHover(null), onClick: () => setSelected(d), className: cn("h-3 w-3 rounded-[3px] relative transition cursor-pointer", !future && "hover:scale-125", hover === k && "ring-1 ring-neon", isSel && "ring-2 ring-neon scale-125", future && "cursor-not-allowed"), style: {
            backgroundColor: colors[lv]
          }, children: hover === k && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-1.5 glass rounded-md px-2 py-1 text-[11px] whitespace-nowrap pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-neon", children: n }),
            " on ",
            format(d, "MMM d, yyyy")
          ] }) }, j);
        }) }, i))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-4 text-[11px] text-muted-foreground justify-end", children: [
        "Less",
        colors.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-[3px]", style: {
          backgroundColor: c
        } }, i)),
        "More"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selected && selectedHabits && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, exit: {
      opacity: 0,
      y: 10
    }, className: "glass rounded-2xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Selected day" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold tracking-tight", children: format(selected, "EEEE, MMMM d, yyyy") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            selectedHabits.filter((s) => s.done).length,
            " of ",
            selectedHabits.length,
            " habits completed"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelected(null), className: "p-1.5 rounded-md hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition", "aria-label": "Close", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      selectedHabits.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-4 text-center", children: "No habits to show." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2 sm:grid-cols-2", children: selectedHabits.map(({
        habit,
        done
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: cn("flex items-center gap-3 rounded-xl px-3 py-2.5 border transition", done ? "bg-neon-soft border-neon/40" : "bg-foreground/[0.02] border-border opacity-70"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-7 w-7 rounded-lg grid place-items-center shrink-0 text-base", style: {
          backgroundColor: done ? habit.color : "transparent",
          boxShadow: done ? `0 0 12px ${habit.color}55` : "none",
          border: done ? "none" : `1px dashed ${habit.color}66`
        }, children: habit.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: habit.name }),
          habit.category && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: habit.category })
        ] }),
        done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-neon shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground shrink-0", children: "missed" })
      ] }, habit.id)) })
    ] }) })
  ] });
}
export {
  HeatmapPage as component
};
