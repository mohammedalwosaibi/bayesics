import { AlertTriangle, Info, OctagonAlert } from "lucide-react";
import { cn } from "@/lib/cn";

type Tone = "note" | "warn" | "trap";

const toneStyles: Record<
  Tone,
  { wrap: string; iconColor: string; icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  note: {
    wrap: "border-[color:var(--accent)]/25 bg-[color:var(--accent-soft)]",
    iconColor: "text-[color:var(--accent)]",
    icon: Info,
    label: "Note",
  },
  warn: {
    wrap: "border-amber-400/40 bg-amber-50",
    iconColor: "text-amber-600",
    icon: AlertTriangle,
    label: "Watch out",
  },
  trap: {
    wrap: "border-rose-400/40 bg-rose-50",
    iconColor: "text-rose-600",
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
        "flex gap-3.5 rounded-xl border px-4 py-3.5 text-[14px] leading-relaxed",
        t.wrap,
        className,
      )}
    >
      <Icon
        className={cn("mt-0.5 h-4 w-4 shrink-0", t.iconColor)}
        aria-hidden
      />
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-65">
          {title ?? t.label}
        </div>
        <div className="mt-1.5 [&>p]:mt-2 first:[&>p]:mt-0">{children}</div>
      </div>
    </aside>
  );
}
