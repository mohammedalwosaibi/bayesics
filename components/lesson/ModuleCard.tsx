"use client";

import Link from "next/link";
import { ArrowRight, Check, Lock } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { ProgressBar } from "./ProgressBar";
import type { ModuleMeta } from "@/lib/curriculum";

const displayClass = "font-[family-name:var(--quant-display)]";

export function ModuleCard({ module: m }: { module: ModuleMeta }) {
  const { completedLessons, completedUnitTests } = useProgress();
  const lessonsDone = m.lessons.filter((l) => completedLessons.has(l.id))
    .length;
  const utDone = completedUnitTests.has(m.id);
  const total = m.lessons.length + 1;
  const completed = lessonsDone + (utDone ? 1 : 0);
  const fraction = total === 0 ? 0 : completed / total;
  const moduleDone = lessonsDone === m.lessons.length && utDone;

  return (
    <article className="group relative flex flex-col rounded-2xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-6 transition hover:border-[color:var(--accent)]/40 hover:bg-white">
      <div className="flex items-start justify-between gap-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
          Module {String(m.number).padStart(2, "0")}
        </div>
        {moduleDone && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--accent)] px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-fg)]">
            <Check className="h-3 w-3" aria-hidden />
            Done
          </span>
        )}
      </div>

      <h2 className={`${displayClass} mt-2 text-2xl leading-tight`}>
        {m.title}
      </h2>
      <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--muted)]">
        {m.tagline}
      </p>

      <div className="mt-5 flex items-center gap-3">
        <ProgressBar value={fraction} />
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
          {lessonsDone} / {m.lessons.length} · {utDone ? "test ✓" : "test —"}
        </span>
      </div>

      <ol className="mt-5 space-y-1.5 text-[13px]">
        {m.lessons.map((l) => {
          const done = completedLessons.has(l.id);
          return (
            <li key={l.id}>
              <Link
                href={`/curriculum/${m.slug}/${l.slug}`}
                className="flex items-center gap-2 text-[color:var(--muted)] transition hover:text-[color:var(--fg)]"
              >
                <span
                  className={
                    done
                      ? "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)] text-[color:var(--accent-fg)]"
                      : "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[color:var(--rule)]"
                  }
                  aria-hidden
                >
                  {done && <Check className="h-2.5 w-2.5" />}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-60">
                  {String(l.order).padStart(2, "0")}
                </span>
                <span className={done ? "line-through decoration-[color:var(--rule)] decoration-2" : ""}>
                  {l.title}
                </span>
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href={`/curriculum/${m.slug}/unit-test`}
            className="flex items-center gap-2 text-[color:var(--muted)] transition hover:text-[color:var(--fg)]"
          >
            <span
              className={
                utDone
                  ? "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)] text-[color:var(--accent-fg)]"
                  : "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-dashed border-[color:var(--accent)]/50 text-[color:var(--accent)]"
              }
              aria-hidden
            >
              {utDone ? <Check className="h-2.5 w-2.5" /> : <Lock className="h-2.5 w-2.5" />}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-60">
              UT
            </span>
            <span className="font-medium text-[color:var(--fg)]">
              Unit test
            </span>
          </Link>
        </li>
      </ol>

      <div className="mt-6 flex items-center justify-between border-t border-[color:var(--rule)] pt-4">
        <Link
          href={`/curriculum/${m.slug}`}
          className="text-[13px] font-medium text-[color:var(--accent)] transition hover:underline"
        >
          Module overview
        </Link>
        <Link
          href={
            lessonsDone < m.lessons.length
              ? `/curriculum/${m.slug}/${m.lessons[lessonsDone]?.slug ?? m.lessons[0].slug}`
              : `/curriculum/${m.slug}/unit-test`
          }
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--fg)] transition hover:text-[color:var(--accent)]"
        >
          {lessonsDone === 0
            ? "Start"
            : moduleDone
              ? "Review"
              : lessonsDone < m.lessons.length
                ? "Continue"
                : "Take unit test"}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
