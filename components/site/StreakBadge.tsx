"use client";

import { Flame } from "lucide-react";
import { useStreak } from "@/lib/progress";

export function StreakBadge() {
  const { current, lastDate } = useStreak();
  const today = new Date().toISOString().slice(0, 10);
  const active = lastDate === today;
  const tone = active
    ? "border-[color:var(--accent)]/40 bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
    : "border-[color:var(--rule)] bg-[color:var(--surface)] text-[color:var(--muted)]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] ${tone}`}
      title={
        current === 0
          ? "Finish a lesson to start a streak"
          : active
            ? `Streak: ${current} day${current === 1 ? "" : "s"} (today ✓)`
            : `Streak: ${current} day${current === 1 ? "" : "s"} (finish a lesson today to keep it)`
      }
    >
      <Flame className="h-3.5 w-3.5" aria-hidden />
      <span>{current}</span>
    </span>
  );
}
