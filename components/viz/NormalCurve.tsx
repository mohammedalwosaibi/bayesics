"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const ACCENT = "#4f46e5";
const ACCENT_FILL = "rgba(79, 70, 229, 0.4)";
const RULE = "rgba(11, 11, 18, 0.10)";
const MUTED = "#5b5b6e";

function pdf(x: number, mu: number, sigma: number) {
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

type Props = {
  mu?: number;
  sigma?: number;
  shadeRange?: [number, number];
  markX?: number;
  caption?: React.ReactNode;
  height?: number;
  span?: number;
  xLabel?: string;
  yLabel?: string;
};

export function NormalCurve({
  mu = 0,
  sigma = 1,
  shadeRange,
  markX,
  caption,
  height = 220,
  span = 4,
  xLabel = "x",
  yLabel = "f(x)",
}: Props) {
  const lo = mu - span * sigma;
  const hi = mu + span * sigma;
  const steps = 121;
  const dx = (hi - lo) / (steps - 1);
  const data = Array.from({ length: steps }, (_, i) => {
    const x = lo + i * dx;
    return { x, y: pdf(x, mu, sigma) };
  });

  return (
    <figure className="my-6">
      <div className="rounded-xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-3">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={data}
            margin={{ top: 8, right: 16, bottom: xLabel ? 34 : 24, left: yLabel ? 18 : 8 }}
          >
            <CartesianGrid stroke={RULE} strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[lo, hi]}
              stroke={MUTED}
              fontSize={11}
              tickMargin={6}
              tickFormatter={(v: number) => v.toFixed(1)}
              label={
                xLabel
                  ? {
                      value: xLabel,
                      position: "insideBottom" as const,
                      offset: -10,
                      fill: MUTED,
                      fontSize: 11,
                    }
                  : undefined
              }
            />
            <YAxis
              stroke={MUTED}
              fontSize={11}
              tickMargin={6}
              width={yLabel ? 42 : 30}
              label={
                yLabel
                  ? {
                      value: yLabel,
                      angle: -90,
                      position: "insideLeft" as const,
                      dx: -6,
                      fill: MUTED,
                      fontSize: 11,
                    }
                  : undefined
              }
            />

            <Tooltip
              contentStyle={{ background: "white", border: `1px solid ${RULE}`, fontSize: 12 }}
              labelFormatter={(v) =>
                typeof v === "number" ? `x = ${v.toFixed(2)}` : String(v)
              }
              formatter={(v) =>
                typeof v === "number" ? v.toFixed(3) : String(v)
              }
            />
            {shadeRange && (
              <ReferenceArea
                x1={shadeRange[0]}
                x2={shadeRange[1]}
                y1={0}
                fill={ACCENT}
                fillOpacity={0.18}
                stroke="none"
              />
            )}
            {typeof markX === "number" && (
              <ReferenceLine x={markX} stroke={ACCENT} strokeDasharray="4 4" />
            )}
            <Area
              type="monotone"
              dataKey="y"
              stroke={ACCENT}
              fill={ACCENT_FILL}
              strokeWidth={1.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[12px] leading-relaxed text-[color:var(--muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
