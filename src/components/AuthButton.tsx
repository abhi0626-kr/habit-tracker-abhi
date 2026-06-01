import { LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/store/auth";
import { signInWithGoogle, signOutUser } from "@/lib/firebase";

export function AuthButton() {
  const user = useAuth((s) => s.user);
  const ready = useAuth((s) => s.ready);

  if (!ready) return null;

  if (user) {
    return (
      <div className="rounded-lg bg-white/5 p-2.5 flex items-center gap-2">
        {user.photoURL ? (
          <img src={user.photoURL} alt="" className="h-8 w-8 rounded-full ring-1 ring-border" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gold/20 grid place-items-center text-xs font-semibold text-gold">
            {(user.displayName || user.email || "U")[0]?.toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium truncate">{user.displayName || "Signed in"}</div>
          <div className="text-[10px] text-muted-foreground truncate">{user.email}</div>
        </div>
        <button
          onClick={async () => {
            try { await signOutUser(); toast.success("Signed out"); }
            catch { toast.error("Sign out failed"); }
          }}
          className="h-7 w-7 grid place-items-center rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition"
          title="Sign out"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={async () => {
        try {
          await signInWithGoogle();
          toast.success("Signed in", { description: "Your habits will sync to the cloud." });
        } catch (e: any) {
          toast.error("Sign in failed", { description: e?.message ?? "Try again." });
        }
      }}
      className="w-full flex items-center justify-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs py-2 transition border border-border"
    >
      <LogIn className="h-3.5 w-3.5 text-gold" /> Sign in with Google
    </button>
  );
}
