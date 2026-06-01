import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useHabits, m as isCompleted, i as cn } from "./router-CRMUO_0X.mjs";
import "../_libs/sonner.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import { m as startOfWeek, s as startOfMonth, f as endOfWeek, c as endOfMonth, e as eachDayOfInterval, g as format, b as addMonths, k as isSameMonth, i as isFuture, l as isToday } from "../_libs/date-fns.mjs";
import { c as ChevronLeft, d as ChevronRight } from "../_libs/lucide-react.mjs";
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
function CalendarPage() {
  const habits = useHabits((s) => s.habits);
  const completions = useHabits((s) => s.completions);
  const [cursor, setCursor] = reactExports.useState(/* @__PURE__ */ new Date());
  const [hover, setHover] = reactExports.useState(null);
  const days = reactExports.useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), {
      weekStartsOn: 1
    });
    const end = endOfWeek(endOfMonth(cursor), {
      weekStartsOn: 1
    });
    return eachDayOfInterval({
      start,
      end
    });
  }, [cursor]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 md:p-8 space-y-6 max-w-[1200px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-end justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Calendar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-semibold tracking-tight mt-1", children: format(cursor, "MMMM yyyy") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 glass rounded-xl p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCursor((d) => addMonths(d, -1)), className: "p-2 rounded-lg hover:bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCursor(/* @__PURE__ */ new Date()), className: "px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-white/5", children: "Today" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCursor((d) => addMonths(d, 1)), className: "p-2 rounded-lg hover:bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 text-[11px] uppercase tracking-wider text-muted-foreground mb-2", children: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1", children: d }, d)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1.5", children: days.map((d) => {
        const inMonth = isSameMonth(d, cursor);
        const completed = habits.filter((h) => isCompleted(completions, h.id, d));
        const future = isFuture(d);
        const key = d.toISOString();
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { onMouseEnter: () => setHover(key), onMouseLeave: () => setHover(null), whileHover: {
          y: -2
        }, className: cn("relative aspect-square rounded-xl p-2 border transition cursor-default", inMonth ? "bg-white/[0.02] border-border" : "bg-transparent border-transparent text-muted-foreground/40", isToday(d) && "ring-1 ring-gold/60", future && "opacity-50"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-xs", isToday(d) && "text-gold font-semibold"), children: format(d, "d") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1.5 left-1.5 right-1.5 flex flex-wrap gap-0.5", children: completed.slice(0, 8).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full", style: {
            backgroundColor: h.color,
            boxShadow: `0 0 4px ${h.color}`
          } }, h.id)) }),
          hover === key && completed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            y: 4
          }, animate: {
            opacity: 1,
            y: 0
          }, className: "absolute z-20 left-1/2 -translate-x-1/2 -top-2 -translate-y-full glass rounded-lg px-3 py-2 text-xs min-w-[160px] whitespace-nowrap shadow-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold mb-1", children: format(d, "MMM d, yyyy") }),
            completed.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full", style: {
                backgroundColor: h.color
              } }),
              h.emoji,
              " ",
              h.name
            ] }, h.id))
          ] })
        ] }, key);
      }) })
    ] })
  ] });
}
export {
  CalendarPage as component
};
