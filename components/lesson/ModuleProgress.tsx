"use client";

import { ProgressBar } from "./ProgressBar";
import { useProgress } from "@/lib/progress";
import type { ModuleMeta } from "@/lib/curriculum";

export function ModuleProgress({
  module,
  showLabel = true,
  className,
}: {
  module: ModuleMeta;
  showLabel?: boolean;
  className?: string;
}) {
  const { completedLessons, completedUnitTests } = useProgress();
  const done = module.lessons.filter((l) => completedLessons.has(l.id)).length;
  const utDone = completedUnitTests.has(module.id);
  const total = module.lessons.length + 1;
  const completed = done + (utDone ? 1 : 0);
  const fraction = total === 0 ? 0 : completed / total;

  return (
    <span className={className}>
      <ProgressBar value={fraction} className="align-middle" />
      {showLabel && (
        <span className="ml-3 align-middle font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
          {done} / {module.lessons.length} · {utDone ? "test ✓" : "test —"}
        </span>
      )}
    </span>
  );
}

export function LessonProgressInline({
  module,
  lessonOrder,
}: {
  module: ModuleMeta;
  lessonOrder: number;
}) {
  const { completedLessons, completedUnitTests } = useProgress();
  const done = module.lessons.filter((l) => completedLessons.has(l.id)).length;
  const utDone = completedUnitTests.has(module.id);
  const total = module.lessons.length + 1;
  const completed = done + (utDone ? 1 : 0);

  return (
    <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--muted)]">
      <span>
        {module.title} · {String(lessonOrder).padStart(2, "0")} /{" "}
        {String(module.lessons.length).padStart(2, "0")}
      </span>
      <ProgressBar value={total === 0 ? 0 : completed / total} />
    </div>
  );
}
