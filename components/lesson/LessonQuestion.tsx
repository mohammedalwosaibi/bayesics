"use client";

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

export function LessonQuestionCard({
  lessonId,
  question,
}: {
  lessonId: string;
  question: LessonQuestion;
}) {
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
  return (
    <div className="rounded-xl border border-[color:var(--accent)]/30 bg-[color:var(--accent-soft)] p-6">
      <QuestionBody
        question={question}
        onCorrect={() => markUnitTestComplete(moduleId)}
      />
    </div>
  );
}
