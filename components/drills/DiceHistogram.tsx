"use client";

import { useEffect, useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";

type HistogramBin = {
  sum: number;
  label: string;
  count: number;
};

const SUMS = Array.from({ length: 11 }, (_, i) => i + 2);

export function DiceHistogram({ className }: { className?: string }) {
  const [frequency, setFrequency] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [rollCount, setRollCount] = useState(0);
  const [sumTotal, setSumTotal] = useState(0);
  const [counts, setCounts] = useState<number[]>(() => Array.from({ length: 11 }, () => 0));
  const [dice, setDice] = useState<[number, number]>([3, 4]);
  const [lastSum, setLastSum] = useState(7);
  const [animating, setAnimating] = useState(false);

  const runningMean = rollCount === 0 ? 0 : sumTotal / rollCount;

  const data = useMemo<HistogramBin[]>(
    () =>
      SUMS.map((sum, index) => ({
        sum,
        label: String(sum),
        count: counts[index],
      })),
    [counts],
  );

  function performRoll() {
    const dieA = 1 + Math.floor(Math.random() * 6);
    const dieB = 1 + Math.floor(Math.random() * 6);
    const sum = dieA + dieB;

    setDice([dieA, dieB]);
    setLastSum(sum);
    setRollCount((count) => count + 1);
    setSumTotal((total) => total + sum);
    setCounts((prev) => prev.map((count, index) => (index === sum - 2 ? count + 1 : count)));
    setAnimating(true);
    window.setTimeout(() => setAnimating(false), 320);
  }

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      performRoll();
    }, 1000 / frequency);

    return () => window.clearInterval(interval);
  }, [frequency, isRunning]);

  function resetSimulation() {
    setRollCount(0);
    setSumTotal(0);
    setCounts(Array.from({ length: 11 }, () => 0));
    setLastSum(dice[0] + dice[1]);
  }

  return (
    <div className={cn("min-w-0 space-y-4", className)}>
      <div className="grid min-w-0 grid-cols-[1.2fr_0.8fr] gap-3">
        <div className="min-w-0 rounded-[1.35rem] border border-[color:var(--sim-rule,rgba(0,0,0,0.08))] bg-white/65 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
                <DiceFace value={dice[0]} animate={animating} />
                <DiceFace value={dice[1]} animate={animating} />
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.18em] opacity-60">Sum</div>
              <div className="font-mono text-4xl font-semibold leading-none tabular-nums">
                {lastSum}
              </div>
            </div>
          </div>
        </div>

        <div className="grid min-w-0 gap-3">
          <StatCard label="Expected value" value={rollCount === 0 ? "—" : runningMean.toFixed(3)} />
          <StatCard label="Rolls logged" value={rollCount.toLocaleString()} muted />
        </div>
      </div>

      <div className="min-w-0 rounded-[1.35rem] border border-[color:var(--sim-rule,rgba(0,0,0,0.08))] bg-white/55 p-3.5">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] opacity-60">Histogram of sums</div>
            <div className="mt-1 text-sm text-[color:var(--muted)]">
              The running mean should drift toward <span className="font-mono text-[color:var(--fg)]">7.000</span>.
            </div>
          </div>
          <div className="rounded-full bg-[color:var(--accent)]/10 px-3 py-1 font-mono text-xs text-[color:var(--accent)]">
            target = 7
          </div>
        </div>

        <div className="h-44 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 8 }}>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: "var(--muted)", opacity: 0.9 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 10, fill: "var(--muted)", opacity: 0.95 }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                cursor={{ fill: "rgba(79,70,229,0.06)" }}
                formatter={(value: number) => [value.toLocaleString(), "count"]}
                labelFormatter={(label) => `sum ${label}`}
                contentStyle={{
                  background: "rgba(255,255,255,0.96)",
                  border: "1px solid var(--sim-rule, rgba(0,0,0,0.08))",
                  borderRadius: 12,
                  boxShadow: "0 14px 36px -24px rgba(11, 11, 18, 0.35)",
                  fontSize: 11,
                }}
              />
              <ReferenceLine x="7" stroke="currentColor" strokeDasharray="4 4" strokeOpacity={0.3} />
              <Bar dataKey="count" radius={[8, 8, 3, 3]} isAnimationActive={false}>
                {data.map((entry) => (
                  <Cell
                    key={entry.sum}
                    fill={
                      entry.sum === lastSum
                        ? "var(--accent)"
                        : entry.sum === 7
                          ? "color-mix(in srgb, var(--accent) 78%, white)"
                          : "color-mix(in srgb, var(--accent) 38%, white)"
                    }
                    fillOpacity={entry.sum === lastSum ? 1 : entry.sum === 7 ? 0.95 : 0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-3 rounded-[1.35rem] border border-[color:var(--sim-rule,rgba(0,0,0,0.08))] bg-white/45 p-3.5">
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between text-[11px]">
            <span className="uppercase tracking-[0.12em] opacity-70">Roll frequency</span>
            <span className="font-mono tabular-nums">{frequency.toFixed(1)} rolls/s</span>
          </div>
          <Slider.Root
            min={0.5}
            max={12}
            step={0.5}
            value={[frequency]}
            onValueChange={([value]) => setFrequency(value)}
            className="relative flex h-5 w-full touch-none select-none items-center"
          >
            <Slider.Track className="relative h-[2px] grow rounded-full bg-[color:var(--sim-track,rgba(0,0,0,0.12))]">
              <Slider.Range className="absolute h-full rounded-full bg-[color:var(--accent)]" />
            </Slider.Track>
            <Slider.Thumb
              aria-label="Roll frequency"
              className="block h-4 w-4 rounded-full bg-[color:var(--accent)] ring-2 ring-white focus:outline-none focus:ring-4 focus:ring-[color:var(--accent)]/20"
            />
          </Slider.Root>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsRunning((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--accent-fg)] transition hover:opacity-90"
          >
            {isRunning ? <Pause className="h-3.5 w-3.5" aria-hidden /> : <Play className="h-3.5 w-3.5" aria-hidden />}
            {isRunning ? "Pause" : "Resume"}
          </button>
          <button
            type="button"
            onClick={resetSimulation}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rule)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition hover:bg-white/60"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="rounded-[1.15rem] border border-[color:var(--sim-rule,rgba(0,0,0,0.08))] bg-white/65 px-4 py-2.5">
      <div className="text-[10px] uppercase tracking-[0.18em] opacity-60">{label}</div>
      <div
        className={cn(
          "mt-1 font-mono text-2xl font-semibold leading-none tabular-nums",
          muted ? "text-[color:var(--fg)]" : "text-[color:var(--accent)]",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function DiceFace({ value, animate }: { value: number; animate: boolean }) {
  const positions = pipPositions[value];

  return (
    <div
      className={cn(
        "dice-pop relative grid h-[4.35rem] w-[4.35rem] grid-cols-3 grid-rows-3 rounded-[1.15rem] border border-[color:var(--sim-rule,rgba(0,0,0,0.08))] bg-[linear-gradient(180deg,#ffffff_0%,#f3f4fb_100%)] p-2 shadow-[0_16px_32px_-24px_rgba(11,11,18,0.6)]",
        animate && "is-active",
      )}
    >
      {positions.map((position) => (
        <span
          key={position}
          className={cn(
            "h-3.5 w-3.5 place-self-center rounded-full bg-[color:var(--fg)]/92 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]",
            pipClassByPosition[position],
          )}
        />
      ))}
    </div>
  );
}

const pipPositions: Record<number, string[]> = {
  1: ["center"],
  2: ["topLeft", "bottomRight"],
  3: ["topLeft", "center", "bottomRight"],
  4: ["topLeft", "topRight", "bottomLeft", "bottomRight"],
  5: ["topLeft", "topRight", "center", "bottomLeft", "bottomRight"],
  6: ["topLeft", "topRight", "midLeft", "midRight", "bottomLeft", "bottomRight"],
};

const pipClassByPosition: Record<string, string> = {
  topLeft: "row-start-1 col-start-1",
  topRight: "row-start-1 col-start-3",
  midLeft: "row-start-2 col-start-1",
  center: "row-start-2 col-start-2",
  midRight: "row-start-2 col-start-3",
  bottomLeft: "row-start-3 col-start-1",
  bottomRight: "row-start-3 col-start-3",
};
