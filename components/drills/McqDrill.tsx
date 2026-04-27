"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

export type McqOption = {
  id: string;
  label: React.ReactNode;
};

type Props = {
  prompt: React.ReactNode;
  options: McqOption[];
  correctId: string;
  explanation?: React.ReactNode;
  className?: string;
  variant?: "default" | "compact" | "cards";
};

export function McqDrill({
  prompt,
  options,
  correctId,
  explanation,
  className,
  variant = "default",
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const isCorrect = checked && selected === correctId;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-sm leading-relaxed">{prompt}</div>
      <ul
        className={cn(
          variant === "cards"
            ? "grid grid-cols-1 gap-2 sm:grid-cols-2"
            : "space-y-2",
        )}
      >
        {options.map((opt) => {
          const isSel = selected === opt.id;
          const showCorrect = checked && opt.id === correctId;
          const showWrong = checked && isSel && opt.id !== correctId;
          return (
            <li key={opt.id}>
              <button
                type="button"
                disabled={checked && isCorrect}
                onClick={() => {
                  if (checked && !isCorrect) setChecked(false);
                  setSelected(opt.id);
                }}
                className={cn(
                  "group flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition",
                  "border-[color:var(--mcq-border,rgba(0,0,0,0.12))]",
                  isSel && !checked && "border-[color:var(--mcq-selected,currentColor)]",
                  showCorrect &&
                    "border-emerald-500/60 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
                  showWrong &&
                    "border-rose-500/60 bg-rose-500/10 text-rose-900 dark:text-rose-100",
                  !isSel && !showCorrect && !showWrong && "hover:bg-[color:var(--mcq-hover,rgba(0,0,0,0.04))]",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[9px]",
                    isSel ? "border-current" : "border-[color:var(--mcq-border,rgba(0,0,0,0.25))]",
                    showCorrect && "border-emerald-600 bg-emerald-600 text-white",
                    showWrong && "border-rose-600 bg-rose-600 text-white",
                  )}
                  aria-hidden
                >
                  {showCorrect ? <Check className="h-2.5 w-2.5" /> : showWrong ? <X className="h-2.5 w-2.5" /> : null}
                </span>
                <span className="flex-1">{opt.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={!selected || (checked && isCorrect)}
          onClick={() => setChecked(true)}
          className="rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wider transition bg-[color:var(--mcq-cta-bg,#111)] text-[color:var(--mcq-cta-fg,#fff)] hover:opacity-90 disabled:opacity-40"
        >
          Check
        </button>
        {checked && !isCorrect && (
          <span className="text-xs text-rose-600">Try again.</span>
        )}
      </div>
      {checked && isCorrect && explanation && (
        <div className="rounded-md border border-[color:var(--mcq-border,rgba(0,0,0,0.12))] bg-[color:var(--mcq-explain-bg,rgba(0,0,0,0.02))] p-3 text-xs leading-relaxed opacity-90">
          {explanation}
        </div>
      )}
    </div>
  );
}
