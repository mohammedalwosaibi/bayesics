"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  prompt: React.ReactNode;
  answer: number;
  tolerance?: number;
  unit?: string;
  placeholder?: string;
  explanation?: React.ReactNode;
  className?: string;
};

export function NumericDrill({
  prompt,
  answer,
  tolerance = 0.02,
  unit = "",
  placeholder = "answer",
  explanation,
  className,
}: Props) {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  function check(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseFloat(value);
    if (Number.isNaN(parsed)) {
      setState("wrong");
      return;
    }
    const ok = Math.abs(parsed - answer) / Math.max(Math.abs(answer), 1e-9) <= tolerance;
    setState(ok ? "correct" : "wrong");
  }

  return (
    <form onSubmit={check} className={cn("space-y-4", className)}>
      <div className="text-sm leading-relaxed">{prompt}</div>
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (state !== "idle") setState("idle");
            }}
            placeholder={placeholder}
            className="w-full rounded-md border border-[color:var(--nd-border,rgba(0,0,0,0.2))] bg-[color:var(--nd-bg,transparent)] px-3 py-2 text-sm outline-none focus:border-[color:var(--nd-focus,currentColor)] font-mono"
          />
          {unit && (
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs opacity-50">
              {unit}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wider transition bg-[color:var(--nd-cta-bg,#111)] text-[color:var(--nd-cta-fg,#fff)] hover:opacity-90"
        >
          Check
        </button>
      </div>
      {state !== "idle" && (
        <div
          role="status"
          className={cn(
            "flex items-start gap-2 rounded-md border px-3 py-2 text-xs",
            state === "correct"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
          )}
        >
          {state === "correct" ? (
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          ) : (
            <X className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          )}
          <span>
            {state === "correct"
              ? "Correct. The intuition clicks once you see how P(+) is dominated by false positives."
              : "Not quite. Remember P(+) includes both true and false positives."}
          </span>
        </div>
      )}
      {state === "correct" && explanation && (
        <div className="text-xs opacity-80 leading-relaxed">{explanation}</div>
      )}
    </form>
  );
}
