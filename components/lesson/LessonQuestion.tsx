"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { McqDrill } from "@/components/drills/McqDrill";
import { NumericDrill } from "@/components/drills/NumericDrill";
import { markLessonComplete, markUnitTestComplete } from "@/lib/progress";
import type { LessonQuestion } from "@/lib/questions";
import type { ModuleId } from "@/lib/curriculum";

function QuestionBody({
  question,
  onCorrect,
}: {
  question: LessonQuestion;
  onCorrect: () => void;
}) {
  if (question.kind === "mcq") {
    return (
      <McqDrill
        prompt={question.prompt}
        options={question.options}
        correctId={question.correctId}
        explanation={question.explanation}
        onCorrect={onCorrect}
      />
    );
  }
  return (
    <NumericDrill
      prompt={question.prompt}
      answer={question.answer}
      tolerance={question.tolerance}
      unit={question.unit}
      placeholder={question.placeholder}
      successNote={question.successNote}
      wrongNote={question.wrongNote}
      explanation={question.explanation}
      onCorrect={onCorrect}
    />
  );
}

function SignInGate({ tone }: { tone: "lesson" | "unit" }) {
  const wrapper =
    tone === "lesson"
      ? "rounded-xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-6"
      : "rounded-xl border border-[color:var(--accent)]/30 bg-[color:var(--accent-soft)] p-6";
  return (
    <div className={wrapper}>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--rule)] bg-[color:var(--bg)] text-[color:var(--muted)]">
            <Lock className="h-3.5 w-3.5" aria-hidden />
          </span>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Sign in to track progress
            </div>
            <p className="mt-1 text-[14px] leading-relaxed text-[color:var(--fg)]">
              Drills check off lessons and renew your daily streak — create a
              free account to start saving progress.
            </p>
          </div>
        </div>
        <Link
          href="/sign-in"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-[color:var(--accent-fg)] shadow-[0_14px_30px_-18px_rgba(79,70,229,0.95)] ring-1 ring-white/20 transition hover:-translate-y-0.5"
        >
          Sign in
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

export function LessonQuestionCard({
  lessonId,
  question,
}: {
  lessonId: string;
  question: LessonQuestion;
}) {
  const { isLoaded, isSignedIn } = useAuth();
  if (isLoaded && !isSignedIn) return <SignInGate tone="lesson" />;
  return (
    <div className="rounded-xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-6">
      <QuestionBody
        question={question}
        onCorrect={() => markLessonComplete(lessonId)}
      />
    </div>
  );
}

export function UnitTestQuestionCard({
  moduleId,
  question,
}: {
  moduleId: ModuleId;
  question: LessonQuestion;
}) {
  const { isLoaded, isSignedIn } = useAuth();
  if (isLoaded && !isSignedIn) return <SignInGate tone="unit" />;
  return (
    <div className="rounded-xl border border-[color:var(--accent)]/30 bg-[color:var(--accent-soft)] p-6">
      <QuestionBody
        question={question}
        onCorrect={() => markUnitTestComplete(moduleId)}
      />
    </div>
  );
}
