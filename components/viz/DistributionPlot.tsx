"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  ReferenceArea,
  AreaChart,
  Area,
} from "recharts";

export type DistributionDatum = { x: number | string; y: number };

type Props = {
  kind: "pmf" | "cdf-discrete" | "pdf" | "cdf-continuous";
  data: DistributionDatum[];
  highlightX?: number | string | Array<number | string>;
  shadeRange?: [number, number];
  xLabel?: string;
  yLabel?: string;
  caption?: React.ReactNode;
  height?: number;
};

const ACCENT = "#4f46e5";
const ACCENT_SOFT = "rgba(79, 70, 229, 0.18)";
const ACCENT_FILL = "rgba(79, 70, 229, 0.4)";
const RULE = "rgba(11, 11, 18, 0.10)";
const MUTED = "#5b5b6e";

export function DistributionPlot({
  kind,
  data,
  highlightX,
  shadeRange,
  xLabel,
  yLabel,
  caption,
  height = 220,
}: Props) {
  const hl = new Set(
    highlightX === undefined
      ? []
      : Array.isArray(highlightX)
        ? highlightX
      : [highlightX],
  );
  const chartMargin = {
    top: 8,
    right: 16,
    bottom: xLabel ? 34 : 24,
    left: yLabel ? 26 : 8,
  };
  const xAxisLabel = xLabel
    ? {
        value: xLabel,
        position: "insideBottom" as const,
        offset: -10,
        fill: MUTED,
        fontSize: 11,
      }
    : undefined;
  const yAxisLabel = yLabel
    ? {
        value: yLabel,
        angle: -90,
        position: "insideLeft" as const,
        dx: -6,
        fill: MUTED,
        fontSize: 11,
      }
    : undefined;

  return (
    <figure className="my-6">
      <div className="rounded-xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-3">
        <ResponsiveContainer width="100%" height={height}>
          {kind === "pmf" ? (
            <BarChart data={data} margin={chartMargin}>
              <CartesianGrid stroke={RULE} strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                stroke={MUTED}
                fontSize={11}
                tickMargin={6}
                label={xAxisLabel}
              />
              <YAxis
                stroke={MUTED}
                fontSize={11}
                tickMargin={6}
                width={yLabel ? 42 : 30}
                label={yAxisLabel}
              />
              <Tooltip
                contentStyle={{ background: "white", border: `1px solid ${RULE}`, fontSize: 12 }}
                labelStyle={{ color: MUTED }}
              />
              <Bar dataKey="y" radius={[3, 3, 0, 0]}>
                {data.map((d, i) => (
                  <Cell
                    key={i}
                    fill={hl.has(d.x) ? ACCENT : ACCENT_SOFT}
                    stroke={hl.has(d.x) ? ACCENT : "transparent"}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : kind === "cdf-discrete" ? (
            <BarChart data={data} margin={chartMargin}>
              <CartesianGrid stroke={RULE} strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                stroke={MUTED}
                fontSize={11}
                tickMargin={6}
                label={xAxisLabel}
              />
              <YAxis
                stroke={MUTED}
                fontSize={11}
                domain={[0, 1]}
                tickMargin={6}
                width={yLabel ? 42 : 30}
                label={yAxisLabel}
              />
              <Tooltip
                contentStyle={{ background: "white", border: `1px solid ${RULE}`, fontSize: 12 }}
                labelStyle={{ color: MUTED }}
              />
              <Bar dataKey="y" radius={[3, 3, 0, 0]}>
                {data.map((d, i) => (
                  <Cell key={i} fill={hl.has(d.x) ? ACCENT : ACCENT_SOFT} />
                ))}
              </Bar>
            </BarChart>
          ) : kind === "pdf" ? (
            <AreaChart data={data} margin={chartMargin}>
              <CartesianGrid stroke={RULE} strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                stroke={MUTED}
                fontSize={11}
                type="number"
                domain={["dataMin", "dataMax"]}
                tickMargin={6}
                label={xAxisLabel}
              />
              <YAxis
                stroke={MUTED}
                fontSize={11}
                tickMargin={6}
                width={yLabel ? 42 : 30}
                label={yAxisLabel}
              />
              <Tooltip
                contentStyle={{ background: "white", border: `1px solid ${RULE}`, fontSize: 12 }}
                labelStyle={{ color: MUTED }}
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
              <Area
                type="monotone"
                dataKey="y"
                stroke={ACCENT}
                fill={ACCENT_FILL}
                strokeWidth={1.6}
              />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={chartMargin}>
              <CartesianGrid stroke={RULE} strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                stroke={MUTED}
                fontSize={11}
                type="number"
                domain={["dataMin", "dataMax"]}
                tickMargin={6}
                label={xAxisLabel}
              />
              <YAxis
                stroke={MUTED}
                fontSize={11}
                domain={[0, 1]}
                tickMargin={6}
                width={yLabel ? 42 : 30}
                label={yAxisLabel}
              />
              <Tooltip
                contentStyle={{ background: "white", border: `1px solid ${RULE}`, fontSize: 12 }}
                labelStyle={{ color: MUTED }}
              />
              <Line type="monotone" dataKey="y" stroke={ACCENT} strokeWidth={1.8} dot={false} />
            </LineChart>
          )}
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
