"use client";

import { Check } from "lucide-react";
import { useProgress } from "@/lib/progress";

export function LessonCheck({
  lessonId,
  order,
}: {
  lessonId: string;
  order: number;
}) {
  const { completedLessons } = useProgress();
  const done = completedLessons.has(lessonId);
  return (
    <span
      className={
        done
          ? "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)] text-[color:var(--accent-fg)]"
          : "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color:var(--rule)] font-mono text-[11px] text-[color:var(--muted)]"
      }
      aria-hidden
    >
      {done ? <Check className="h-3.5 w-3.5" /> : String(order).padStart(2, "0")}
    </span>
  );
}
