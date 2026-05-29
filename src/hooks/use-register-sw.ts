import { useEffect } from "react";

/**
 * Registers the offline service worker, but ONLY on the real published origin.
 * It is skipped inside iframes and on Lovable preview hosts (per platform guidance)
 * so the editor preview never gets locked to a stale shell.
 */
export function useRegisterSW() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const inIframe = (() => {
      try { return window.self !== window.top; } catch { return true; }
    })();
    const host = window.location.hostname;
    const isPreview =
      host.includes("id-preview--") ||
      host.includes("lovableproject.com") ||
      host === "localhost" ||
      host === "127.0.0.1";

    if (inIframe || isPreview) {
      navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister())).catch(() => {});
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch((err) => console.warn("SW register failed", err));
  }, []);
}
