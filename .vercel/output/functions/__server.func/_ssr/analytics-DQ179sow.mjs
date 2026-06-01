import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useHabits, m as isCompleted, k as currentStreak, h as bestStreak, j as completionRate } from "./router-CRMUO_0X.mjs";
import "../_libs/sonner.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import { m as startOfWeek, o as subDays, e as eachDayOfInterval, g as format, q as subMonths, c as endOfMonth, s as startOfMonth } from "../_libs/date-fns.mjs";
import { o as Star, q as TrendingUp, a as Award, F as Flame } from "../_libs/lucide-react.mjs";
import { d as ResponsiveContainer, c as RadialBarChart, P as PolarAngleAxis, R as RadialBar, a as AreaChart, X as XAxis, Y as YAxis, T as Tooltip, A as Area, b as BarChart, B as Bar } from "../_libs/recharts.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
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
import "../_libs/es-toolkit.mjs";
import "../_libs/reselect.mjs";
import "../_libs/react-is.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/reduxjs__toolkit.mjs";
import "../_libs/redux.mjs";
import "../_libs/immer.mjs";
import "../_libs/redux-thunk.mjs";
import "../_libs/react-redux.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function AnalyticsPage() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  const weekly = reactExports.useMemo(() => {
    const today = /* @__PURE__ */ new Date();
    const start = startOfWeek(subDays(today, 11 * 7), {
      weekStartsOn: 1
    });
    const weeks = [];
    for (let i = 0; i < 12; i++) {
      const wStart = subDays(start, -i * 7);
      const days = eachDayOfInterval({
        start: wStart,
        end: subDays(wStart, -6)
      });
      let c = 0;
      habits.forEach((h) => days.forEach((d) => {
        if (isCompleted(completions, h.id, d)) c++;
      }));
      weeks.push({
        week: format(wStart, "MMM d"),
        count: c
      });
    }
    return weeks;
  }, [habits, completions]);
  const monthly = reactExports.useMemo(() => {
    const today = /* @__PURE__ */ new Date();
    return Array.from({
      length: 6
    }, (_, i) => {
      const m = subMonths(today, 5 - i);
      const days = eachDayOfInterval({
        start: startOfMonth(m),
        end: endOfMonth(m)
      });
      let total = 0, done = 0;
      habits.forEach((h) => days.forEach((d) => {
        if (d > today) return;
        total++;
        if (isCompleted(completions, h.id, d)) done++;
      }));
      return {
        month: format(m, "MMM"),
        pct: total ? Math.round(done / total * 100) : 0
      };
    });
  }, [habits, completions]);
  const perHabit = reactExports.useMemo(() => {
    const today = /* @__PURE__ */ new Date();
    return habits.map((h) => ({
      name: h.name,
      emoji: h.emoji,
      color: h.color,
      rate: completionRate(completions, h, subDays(today, 30), today),
      best: bestStreak(completions, h.id),
      current: currentStreak(completions, h.id, today)
    }));
  }, [habits, completions]);
  const mostConsistent = [...perHabit].sort((a, b) => b.rate - a.rate)[0];
  const longestStreak = [...perHabit].sort((a, b) => b.best - a.best)[0];
  const score = Math.round(perHabit.reduce((s, h) => s + h.rate, 0) / Math.max(1, perHabit.length));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 md:p-8 space-y-6 max-w-[1400px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Analytics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-semibold tracking-tight mt-1", children: "Insights & trends" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 lg:col-span-1 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 text-gold" }),
          " Productivity score"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 w-44", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadialBarChart, { innerRadius: "78%", outerRadius: "100%", data: [{
            value: score,
            fill: "var(--gold)"
          }], startAngle: 90, endAngle: -270, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PolarAngleAxis, { type: "number", domain: [0, 100], tick: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RadialBar, { background: {
              fill: "rgba(255,255,255,0.05)"
            }, dataKey: "value", cornerRadius: 20 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-semibold text-gold", children: score }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "last 30 days" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-gold" }),
            " Weekly consistency"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "last 12 weeks" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: weekly, margin: {
          left: -20,
          right: 8,
          top: 8,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--gold)", stopOpacity: 0.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--gold)", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "week", stroke: "rgba(255,255,255,0.3)", fontSize: 11, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "rgba(255,255,255,0.3)", fontSize: 11, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "rgba(0,0,0,0.85)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "count", stroke: "var(--gold)", strokeWidth: 2, fill: "url(#g)" })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold mb-3", children: "Monthly completion %" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: monthly, margin: {
          left: -20,
          right: 8,
          top: 8,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", stroke: "rgba(255,255,255,0.3)", fontSize: 11, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "rgba(255,255,255,0.3)", fontSize: 11, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "rgba(0,0,0,0.85)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "pct", fill: "var(--gold)", radius: [8, 8, 0, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Insight, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4" }), label: "Most consistent", value: mostConsistent ? `${mostConsistent.emoji} ${mostConsistent.name}` : "—", sub: mostConsistent ? `${mostConsistent.rate}%` : "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Insight, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4" }), label: "Longest streak", value: longestStreak ? `${longestStreak.emoji} ${longestStreak.name}` : "—", sub: longestStreak ? `${longestStreak.best} days` : "" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold mb-4", children: "Habit success rate · last 30 days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        perHabit.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-24 sm:w-40 shrink-0 truncate text-xs sm:text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full shrink-0", style: {
              backgroundColor: h.color
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
              h.emoji,
              " ",
              h.name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0 h-2 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all", style: {
            width: `${h.rate}%`,
            background: `linear-gradient(90deg, ${h.color}80, ${h.color})`,
            boxShadow: `0 0 12px ${h.color}50`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-16 sm:w-20 text-right text-[10px] sm:text-xs font-mono text-muted-foreground shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gold", children: [
              h.rate,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 sm:ml-2", children: [
              "🔥",
              h.current
            ] })
          ] })
        ] }, h.name)),
        perHabit.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground text-center py-8", children: "No habits yet." })
      ] })
    ] })
  ] });
}
function Insight({
  icon,
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass glass-hover rounded-2xl p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-base font-semibold truncate", children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gold mt-0.5", children: sub })
  ] });
}
export {
  AnalyticsPage as component
};
