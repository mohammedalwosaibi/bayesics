import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  type LessonMeta,
  type ModuleMeta,
  neighbors,
  unitTestNeighbors,
  stepHref,
  stepLabel,
} from "@/lib/curriculum";
import {
  LessonQuestionCard,
  UnitTestQuestionCard,
} from "./LessonQuestion";
import { LessonProgressInline } from "./ModuleProgress";
import { questionsByLessonId, unitTestByModuleId } from "@/lib/questions";

const displayClass = "font-[family-name:var(--quant-display)]";

type Props = {
  module: ModuleMeta;
  lesson?: LessonMeta;
  isUnitTest?: boolean;
  children: React.ReactNode;
};

export function LessonShell({ module, lesson, isUnitTest, children }: Props) {
  const orderLabel = isUnitTest ? "Unit test" : `Lesson ${String(lesson?.order ?? 0).padStart(2, "0")}`;
  const title = isUnitTest
    ? `${module.title} · Unit test`
    : (lesson?.title ?? "");
  const eyebrow = isUnitTest
    ? `Module ${module.number} · Unit test`
    : `${module.title} · ${orderLabel}`;

  const nav = isUnitTest
    ? unitTestNeighbors(module.id)
    : lesson
      ? neighbors(lesson.id)
      : {};

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b border-[color:var(--rule)] bg-[color:var(--bg)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-1.5 text-[12px] text-[color:var(--muted)] transition hover:text-[color:var(--fg)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Curriculum
          </Link>
          {isUnitTest ? (
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Unit test
            </div>
          ) : (
            lesson && (
              <LessonProgressInline module={module} lessonOrder={lesson.order} />
            )
          )}
        </div>
      </div>

      <article className="mx-auto w-full max-w-prose grow space-y-12 px-6 py-12 pb-24">
        <header>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
            {eyebrow}
          </div>
          <h1
            className={`${displayClass} mt-3 text-3xl leading-tight md:text-4xl`}
          >
            {title}
          </h1>
          {!isUnitTest && lesson?.blurb && (
            <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--muted)]">
              {lesson.blurb}
            </p>
          )}
          {isUnitTest && (
            <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--muted)]">
              One question that combines what you learned across this module.
              Solve it to mark the module test complete.
            </p>
          )}
        </header>

        {children}

        <section>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
            {isUnitTest ? "Unit test" : "Check your read"}
          </div>
          <h2 className={`${displayClass} mt-2 text-2xl`}>
            {isUnitTest ? "One question." : "Quick drill."}
          </h2>
          <p className="mt-2 text-[14px] text-[color:var(--muted)]">
            {isUnitTest
              ? "Get this right to complete the module unit test."
              : "Answer correctly to mark this lesson complete."}
          </p>
          <div className="mt-6">
            {isUnitTest ? (
              <UnitTestQuestionCard
                moduleId={module.id}
                question={unitTestByModuleId[module.id]}
              />
            ) : (
              lesson && (
                <LessonQuestionCard
                  lessonId={lesson.id}
                  question={questionsByLessonId[lesson.id]}
                />
              )
            )}
          </div>
        </section>

        <nav className="flex items-center justify-between border-t border-[color:var(--rule)] pt-6 text-[13px]">
          {nav.prev ? (
            <Link
              href={stepHref(nav.prev)}
              className="inline-flex items-center gap-2 text-[color:var(--muted)] hover:text-[color:var(--fg)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">Previous:</span>
              <span className="font-medium text-[color:var(--fg)]">
                {stepLabel(nav.prev)}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nav.next ? (
            <Link
              href={stepHref(nav.next)}
              className="inline-flex items-center gap-2 text-[color:var(--muted)] hover:text-[color:var(--fg)]"
            >
              <span className="hidden sm:inline">Next up:</span>
              <span className="font-medium text-[color:var(--fg)]">
                {stepLabel(nav.next)}
              </span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          ) : (
            <Link
              href="/curriculum"
              className="inline-flex items-center gap-2 text-[color:var(--muted)] hover:text-[color:var(--fg)]"
            >
              Back to curriculum
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
