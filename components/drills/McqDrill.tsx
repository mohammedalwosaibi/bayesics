"use client";

import { useRef, useState } from "react";
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
  onCorrect?: () => void;
};

export function McqDrill({
  prompt,
  options,
  correctId,
  explanation,
  className,
  variant = "default",
  onCorrect,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const firedRef = useRef(false);

  const isCorrect = checked && selected === correctId;

  function handleCheck() {
    setChecked(true);
    if (selected === correctId && !firedRef.current) {
      firedRef.current = true;
      onCorrect?.();
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-[14px] leading-relaxed">{prompt}</div>

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
                  "group flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-[14px] transition",
                  /* default */
                  "border-[color:var(--mcq-border,rgba(0,0,0,0.11))] bg-white",
                  /* selected, not checked */
                  isSel && !checked && "border-[color:var(--accent)]/40 bg-[color:var(--accent-soft)] shadow-[inset_0_0_0_1.5px_rgba(79,70,229,0.25)]",
                  /* correct */
                  showCorrect &&
                    "border-emerald-400/50 bg-emerald-50 text-emerald-900",
                  /* wrong */
                  showWrong &&
                    "border-rose-400/50 bg-rose-50 text-rose-900",
                  /* hover (unselected only) */
                  !isSel && !showCorrect && !showWrong &&
                    "hover:border-[color:var(--rule)] hover:bg-[color:var(--surface)]",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[9px] transition",
                    isSel && !checked
                      ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                      : "border-[color:var(--mcq-border,rgba(0,0,0,0.22))]",
                    showCorrect && "border-emerald-600 bg-emerald-600 text-white",
                    showWrong && "border-rose-600 bg-rose-600 text-white",
                  )}
                  aria-hidden
                >
                  {showCorrect ? (
                    <Check className="h-2.5 w-2.5" />
                  ) : showWrong ? (
                    <X className="h-2.5 w-2.5" />
                  ) : isSel && !checked ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  ) : null}
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
          onClick={handleCheck}
          className="rounded-full bg-[color:var(--mcq-cta-bg,#111)] px-5 py-2 text-[12px] font-semibold uppercase tracking-wider text-[color:var(--mcq-cta-fg,#fff)] shadow-[var(--shadow-sm)] transition hover:-translate-y-px hover:opacity-90 disabled:translate-y-0 disabled:opacity-35"
        >
          Check
        </button>
        {checked && !isCorrect && (
          <span className="text-[13px] font-medium text-rose-600">
            Not quite — try again.
          </span>
        )}
      </div>

      {checked && isCorrect && explanation && (
        <div className="rounded-xl border border-[color:var(--accent)]/20 bg-[color:var(--accent-soft)] p-4 text-[13px] leading-relaxed">
          {explanation}
        </div>
      )}
    </div>
  );
}
