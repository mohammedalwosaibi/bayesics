"use client";

import { useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import {
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { bayesPosterior, fmtPct } from "@/lib/bayes";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  lineColor?: string;
  dotColor?: string;
};

export function BayesSimulator({
  className,
  lineColor = "var(--accent, #4f46e5)",
  dotColor = "var(--accent, #4f46e5)",
}: Props) {
  const [prior, setPrior] = useState(0.01);
  const [sens, setSens] = useState(0.99);
  const [spec, setSpec] = useState(0.95);

  const posterior = bayesPosterior({ prior, sensitivity: sens, specificity: spec });

  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 80; i++) {
      const p = i / 80 * 0.5;
      points.push({
        prior: p,
        posterior: bayesPosterior({ prior: p, sensitivity: sens, specificity: spec }),
      });
    }
    return points;
  }, [sens, spec]);

  return (
    <div className={cn("space-y-5", className)}>
      <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--sim-rule,rgba(0,0,0,0.08))] pb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] opacity-60">Posterior</div>
          <div className="font-mono text-3xl font-semibold tabular-nums">
            {fmtPct(posterior, 1)}
          </div>
        </div>
        <div className="text-right text-[10px] uppercase tracking-[0.18em] opacity-60">
          <div>
            P(D | +) =
            <span className="font-mono ml-1">{posterior.toFixed(3)}</span>
          </div>
        </div>
      </div>

      <div className="h-36 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={curve} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="prior"
              type="number"
              domain={[0, 0.5]}
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
              tick={{ fontSize: 10, fill: "currentColor", opacity: 0.6 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="number"
              domain={[0, 1]}
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
              tick={{ fontSize: 10, fill: "currentColor", opacity: 0.6 }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip
              formatter={(v) => fmtPct(Number(v), 1)}
              labelFormatter={(v) => `prior ${fmtPct(Number(v), 1)}`}
              contentStyle={{
                background: "var(--surface, #fff)",
                border: "1px solid var(--sim-rule, rgba(0,0,0,0.1))",
                borderRadius: 6,
                fontSize: 11,
              }}
            />
            <Line
              type="monotone"
              dataKey="posterior"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <ReferenceDot
              x={prior}
              y={posterior}
              r={5}
              fill={dotColor}
              stroke="var(--surface, #fff)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <SimSlider
          label="Prior P(D)"
          value={prior}
          min={0}
          max={0.5}
          step={0.001}
          onChange={setPrior}
          format={(v) => fmtPct(v, 2)}
        />
        <SimSlider
          label="Sensitivity P(+|D)"
          value={sens}
          min={0.5}
          max={1}
          step={0.001}
          onChange={setSens}
          format={(v) => fmtPct(v, 1)}
        />
        <SimSlider
          label="Specificity P(−|¬D)"
          value={spec}
          min={0.5}
          max={1}
          step={0.001}
          onChange={setSpec}
          format={(v) => fmtPct(v, 1)}
        />
      </div>
    </div>
  );
}

function SimSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between text-[11px]">
        <span className="uppercase tracking-[0.12em] opacity-70">{label}</span>
        <span className="font-mono tabular-nums">{format(value)}</span>
      </div>
      <Slider.Root
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="relative flex h-5 w-full touch-none select-none items-center"
      >
        <Slider.Track className="relative h-[2px] grow rounded-full bg-[color:var(--sim-track,rgba(0,0,0,0.12))]">
          <Slider.Range className="absolute h-full rounded-full bg-[color:var(--accent,#4f46e5)]" />
        </Slider.Track>
        <Slider.Thumb
          className="block h-4 w-4 rounded-full bg-[color:var(--accent,#4f46e5)] ring-2 ring-[color:var(--surface,#fff)] focus:outline-none focus:ring-4 focus:ring-[color:var(--accent,#4f46e5)]/20"
          aria-label={label}
        />
      </Slider.Root>
    </div>
  );
}
