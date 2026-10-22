import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "button" | "switch" | "icon";
  className?: string;
  showText?: boolean;
}

export function ThemeToggle({
  variant = "button",
  className,
  showText = true,
}: ThemeToggleProps) {
  const { theme, toggleTheme, isLight } = useTheme();

  if (variant === "switch") {
    return (
      <div
        className={cn(
          "rounded-lg bg-white/5 p-2.5 flex items-center justify-between",
          className
        )}
      >
        <div className="flex items-center gap-2 text-xs">
          {isLight ? (
            <Sun className="h-3.5 w-3.5 text-gold animate-in fade-in zoom-in duration-200" />
          ) : (
            <Moon className="h-3.5 w-3.5 text-gold animate-in fade-in zoom-in duration-200" />
          )}
          <span>Light mode</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={isLight}
          aria-label="Toggle light mode"
          onClick={toggleTheme}
          className={cn(
            "h-4 w-7 rounded-full transition relative cursor-pointer",
            isLight ? "bg-gold" : "bg-white/15"
          )}
          title={isLight ? "Switch to dark mode" : "Switch to light mode"}
        >
          <span
            className={cn(
              "absolute top-0.5 h-3 w-3 rounded-full bg-background transition-all shadow-xs",
              isLight ? "left-3.5" : "left-0.5"
            )}
          />
        </button>
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "h-8 w-8 grid place-items-center rounded-lg bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition cursor-pointer select-none",
          className
        )}
        title={isLight ? "Switch to dark mode" : "Switch to light mode"}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      >
        {isLight ? (
          <Moon className="h-4 w-4 text-gold transition-transform hover:-rotate-12" />
        ) : (
          <Sun className="h-4 w-4 text-gold transition-transform hover:rotate-45" />
        )}
      </button>
    );
  }

  // Default "button" pill variant (ideal for headers alongside 'Reset month')
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "glass rounded-xl px-3 py-2 text-xs font-medium flex items-center gap-1.5 transition-all hover:text-gold hover:border-gold/40 cursor-pointer select-none",
        className
      )}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-label="Toggle light mode"
    >
      {isLight ? (
        <>
          <Moon className="h-3.5 w-3.5 text-gold transition-transform group-hover:-rotate-12" />
          {showText && <span>Dark mode</span>}
        </>
      ) : (
        <>
          <Sun className="h-3.5 w-3.5 text-gold transition-transform group-hover:rotate-45" />
          {showText && <span>Light mode</span>}
        </>
      )}
    </button>
  );
}
