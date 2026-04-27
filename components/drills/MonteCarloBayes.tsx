"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Play, RotateCcw } from "lucide-react";
import { bayesPosterior, fmtPct } from "@/lib/bayes";
import { cn } from "@/lib/cn";

type Props = {
  prior?: number;
  sensitivity?: number;
  specificity?: number;
  batchSize?: number;
  className?: string;
};

type Point = {
  n: number;
  estimate: number;
};

export function MonteCarloBayes({
  prior = 0.01,
  sensitivity = 0.99,
  specificity = 0.95,
  batchSize = 2000,
  className,
}: Props) {
  const [positives, setPositives] = useState(0);
  const [truePos, setTruePos] = useState(0);
  const [series, setSeries] = useState<Point[]>([]);

  const theoretical = bayesPosterior({ prior, sensitivity, specificity });
  const empirical = positives === 0 ? 0 : truePos / positives;
  const totalPositives = positives;

  function runBatch() {
    let tp = truePos;
    let pos = positives;
    const points = series.slice();
    const start = points.length;
    for (let i = 0; i < batchSize; i++) {
      const diseased = Math.random() < prior;
      const testsPositive = diseased
        ? Math.random() < sensitivity
        : Math.random() < 1 - specificity;
      if (testsPositive) {
        pos++;
        if (diseased) tp++;
      }
      if ((i + 1) % Math.ceil(batchSize / 40) === 0) {
        points.push({
          n: start * batchSize / 40 + (i + 1),
          estimate: pos === 0 ? 0 : tp / pos,
        });
      }
    }
    setTruePos(tp);
    setPositives(pos);
    setSeries(points);
  }

  function reset() {
    setPositives(0);
    setTruePos(0);
    setSeries([]);
  }

  return (
    <div className={cn("space-y-5", className)}>
      <div className="grid grid-cols-3 gap-3 text-center">
        <Stat label="Theoretical P(D|+)" value={fmtPct(theoretical, 2)} tone="muted" />
        <Stat label="Empirical" value={totalPositives === 0 ? "—" : fmtPct(empirical, 2)} tone="accent" />
        <Stat label="Positive tests" value={totalPositives.toLocaleString()} tone="muted" />
      </div>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
            <defs>
              <linearGradient id="mcAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent, #22d3ee)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--accent, #22d3ee)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="n"
              type="number"
              domain={[0, "dataMax"]}
              tick={{ fontSize: 10, fill: "currentColor", opacity: 0.6 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`)}
            />
            <YAxis
              type="number"
              domain={[0, Math.max(0.3, theoretical * 2)]}
              tick={{ fontSize: 10, fill: "currentColor", opacity: 0.6 }}
              axisLine={false}
              tickLine={false}
              width={36}
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            />
            <Tooltip
              contentStyle={{
                background: "var(--surface, #0f172a)",
                border: "1px solid var(--sim-rule, rgba(255,255,255,0.1))",
                borderRadius: 6,
                fontSize: 11,
              }}
              formatter={(v: number) => fmtPct(v, 2)}
              labelFormatter={(v: number) => `n = ${v.toLocaleString()}`}
            />
            <ReferenceLine
              y={theoretical}
              stroke="currentColor"
              strokeDasharray="3 3"
              strokeOpacity={0.4}
            />
            <Area
              type="monotone"
              dataKey="estimate"
              stroke="var(--accent, #22d3ee)"
              strokeWidth={2}
              fill="url(#mcAreaFill)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={runBatch}
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wider transition bg-[color:var(--accent,#22d3ee)] text-[color:var(--accent-fg,#0b1020)] hover:opacity-90"
        >
          <Play className="h-3.5 w-3.5" aria-hidden />
          Run {batchSize.toLocaleString()} trials
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-md border border-[color:var(--mcq-border,rgba(255,255,255,0.2))] px-3 py-2 text-xs font-medium uppercase tracking-wider transition hover:bg-[color:var(--mcq-hover,rgba(255,255,255,0.06))]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Reset
        </button>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "accent" | "muted";
}) {
  return (
    <div className="rounded-md border border-[color:var(--mcq-border,rgba(255,255,255,0.08))] bg-[color:var(--surface-raised,rgba(255,255,255,0.02))] px-3 py-2">
      <div className="text-[9px] uppercase tracking-[0.18em] opacity-60">{label}</div>
      <div
        className={cn(
          "mt-1 font-mono text-lg tabular-nums",
          tone === "accent" && "text-[color:var(--accent,#22d3ee)]",
        )}
      >
        {value}
      </div>
    </div>
  );
}
