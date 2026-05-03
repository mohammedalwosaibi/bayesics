import { AlertTriangle, Info, OctagonAlert } from "lucide-react";
import { cn } from "@/lib/cn";

type Tone = "note" | "warn" | "trap";

const toneStyles: Record<
  Tone,
  { wrap: string; icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  note: {
    wrap: "border-[color:var(--accent)]/30 bg-[color:var(--accent-soft)]",
    icon: Info,
    label: "Note",
  },
  warn: {
    wrap: "border-amber-500/30 bg-amber-500/10",
    icon: AlertTriangle,
    label: "Watch out",
  },
  trap: {
    wrap: "border-rose-500/30 bg-rose-500/10",
    icon: OctagonAlert,
    label: "Trap",
  },
};

export function Callout({
  tone = "note",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const t = toneStyles[tone];
  const Icon = t.icon;
  return (
    <aside
      className={cn(
        "flex gap-3 rounded-xl border px-4 py-3 text-[14px] leading-relaxed",
        t.wrap,
        className,
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0 opacity-80" aria-hidden />
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
          {title ?? t.label}
        </div>
        <div className="mt-1 [&>p]:mt-2 first:[&>p]:mt-0">{children}</div>
      </div>
    </aside>
  );
}
