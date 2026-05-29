import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, Monitor, Apple } from "lucide-react";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function InstallDialog() {
  const [open, setOpen] = useState(false);
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => { e.preventDefault(); setDeferred(e as BIPEvent); };
    const onInstalled = () => { setInstalled(true); setDeferred(null); };
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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-1.5 rounded-md bg-neon/15 text-neon hover:bg-neon/25 text-xs py-1.5 transition"
      >
        <Download className="h-3.5 w-3.5" /> Install app
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-6 max-w-md w-full relative neon-glow"
            >
              <button onClick={() => setOpen(false)} className="absolute top-3 right-3 p-1 rounded text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
              <h2 className="text-lg font-semibold text-neon">Install Habitus</h2>
              <p className="text-xs text-muted-foreground mt-1">Use it like a native app — works fully offline once installed.</p>

              {installed && (
                <div className="mt-4 rounded-lg bg-neon/10 border border-neon/30 px-3 py-2 text-xs text-neon">
                  ✓ Habitus is already installed on this device.
                </div>
              )}

              {deferred && !installed && (
                <button
                  onClick={install}
                  className="mt-4 w-full bg-neon text-primary-foreground font-medium py-2.5 rounded-lg hover:brightness-110 transition"
                >
                  Install now
                </button>
              )}

              <div className="mt-5 space-y-3 text-sm">
                <Step icon={<Monitor className="h-4 w-4" />} title="Desktop (Chrome / Edge)">
                  Click the <span className="text-neon">install icon</span> in the address bar, or open the browser menu → <em>Install Habitus…</em>
                </Step>
                <Step icon={<Apple className="h-4 w-4" />} title="iPhone / iPad (Safari)">
                  Tap the <span className="text-neon">Share</span> button → <em>Add to Home Screen</em>.
                </Step>
                <Step icon={<Smartphone className="h-4 w-4" />} title="Android (Chrome)">
                  Tap the <span className="text-neon">⋮ menu</span> → <em>Install app</em> or <em>Add to Home screen</em>.
                </Step>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Step({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-white/5 p-3">
      <div className="flex items-center gap-2 text-neon text-xs font-semibold">{icon} {title}</div>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
