import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, createRootRouteWithContext, useRouter,
  HeadContent, Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { AppSidebar } from "@/components/AppSidebar";
import { useHydrateStore } from "@/hooks/use-hydrate-store";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gold">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">This page doesn't exist.</p>
        <a href="/" className="mt-6 inline-block rounded-md bg-gold px-4 py-2 text-sm font-medium text-primary-foreground">Go home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-5 rounded-md bg-gold px-4 py-2 text-sm font-medium text-primary-foreground"
        >Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Habitus — Offline Habit Tracker" },
      { name: "description", content: "Build better habits with a beautiful offline-first habit tracker. Track streaks, view heatmaps, and analyze your progress." },
      { name: "theme-color", content: "#0a0a0a" },
      { property: "og:title", content: "Habitus — Offline Habit Tracker" },
      { property: "og:description", content: "Track habits, streaks and progress — fully offline." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "icon", href: "/icon-192.png", type: "image/png" },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}

function AppShell() {
  const hydrated = useHydrateStore();
  if (!hydrated) {
    return <div className="grid place-items-center min-h-screen text-sm text-muted-foreground">Loading…</div>;
  }
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>

  );
}
