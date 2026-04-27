import { Lock } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  tier?: string;
  label?: string;
  cta?: string;
  children?: React.ReactNode;
  className?: string;
  preview?: React.ReactNode;
};

export function LockedPanel({
  tier = "Pro",
  label = "Full solution walkthrough",
  cta = "Unlock",
  preview,
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border",
        "border-[color:var(--lp-border,rgba(0,0,0,0.08))]",
        "bg-[color:var(--lp-surface,transparent)]",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none select-none blur-[4px] opacity-40 p-6">
        {preview ?? children ?? (
          <div className="space-y-2">
            <div className="h-3 w-2/3 rounded bg-current/20" />
            <div className="h-3 w-5/6 rounded bg-current/20" />
            <div className="h-3 w-1/2 rounded bg-current/20" />
            <div className="h-3 w-3/4 rounded bg-current/20" />
          </div>
        )}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center bg-gradient-to-b from-transparent via-[color:var(--lp-veil,rgba(255,255,255,0.7))] to-[color:var(--lp-veil-b,rgba(255,255,255,0.95))]">
        <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[color:var(--lp-tier-fg,#6b7280)]">
          <Lock className="h-3 w-3" aria-hidden />
          <span>{tier}</span>
        </div>
        <p className="text-sm font-medium max-w-xs text-[color:var(--lp-label-fg,#111)]">
          {label}
        </p>
        <button
          type="button"
          className="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition bg-[color:var(--lp-cta-bg,#111)] text-[color:var(--lp-cta-fg,#fff)] hover:opacity-90"
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
