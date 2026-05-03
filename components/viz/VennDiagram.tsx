import { cn } from "@/lib/cn";

export type VennRegion =
  | "A"
  | "B"
  | "AnB"
  | "AuB"
  | "Aonly"
  | "Bonly"
  | "Acomp"
  | "Bcomp"
  | "neither"
  | "symdiff"
  | "none";

type Props = {
  shaded?: VennRegion;
  labels?: { A?: string; B?: string; universe?: string };
  caption?: React.ReactNode;
  className?: string;
};

const cx1 = 100;
const cx2 = 160;
const cy = 90;
const r = 50;

// Soft fill + stronger shade colors
const SOFT = "var(--accent-soft)";
const SHADE = "var(--accent)";

export function VennDiagram({
  shaded = "none",
  labels = {},
  caption,
  className,
}: Props) {
  const aLabel = labels.A ?? "A";
  const bLabel = labels.B ?? "B";
  const universe = labels.universe ?? "Ω";

  const showA = shaded === "A" || shaded === "AuB" || shaded === "Aonly";
  const showB = shaded === "B" || shaded === "AuB" || shaded === "Bonly";
  const showInter = shaded === "AnB" || shaded === "AuB";
  const showAnotB = shaded === "Aonly" || shaded === "symdiff" || shaded === "Bcomp";
  const showBnotA = shaded === "Bonly" || shaded === "symdiff" || shaded === "Acomp";
  const showNeither = shaded === "neither" || shaded === "Acomp" || shaded === "Bcomp";

  return (
    <figure className={cn("my-6", className)}>
      <svg
        viewBox="0 0 260 180"
        className="block w-full max-w-md mx-auto h-auto"
        role="img"
        aria-label={`Venn diagram of sets ${aLabel} and ${bLabel}`}
      >
        <defs>
          <clipPath id="venn-A">
            <circle cx={cx1} cy={cy} r={r} />
          </clipPath>
          <clipPath id="venn-B">
            <circle cx={cx2} cy={cy} r={r} />
          </clipPath>
          <clipPath id="venn-universe">
            <rect x="6" y="6" width="248" height="168" rx="10" />
          </clipPath>
        </defs>

        {/* universe rectangle */}
        <rect
          x="6"
          y="6"
          width="248"
          height="168"
          rx="10"
          fill="var(--surface)"
          stroke="var(--rule)"
        />

        {/* soft circle fills (always visible) */}
        <circle cx={cx1} cy={cy} r={r} fill={SOFT} />
        <circle cx={cx2} cy={cy} r={r} fill={SOFT} />

        {/* "neither / outside both circles" — shade everything in the universe except the union */}
        {showNeither && (
          <g clipPath="url(#venn-universe)">
            <rect x="0" y="0" width="260" height="180" fill={SHADE} fillOpacity="0.32" />
            <circle cx={cx1} cy={cy} r={r} fill="var(--surface)" />
            <circle cx={cx2} cy={cy} r={r} fill="var(--surface)" />
            {/* re-fill A if Bcomp was requested (inside A still shaded) */}
            {shaded === "Bcomp" && (
              <g>
                <circle cx={cx1} cy={cy} r={r} fill={SHADE} fillOpacity="0.32" />
                <circle cx={cx2} cy={cy} r={r} fill="var(--surface)" />
              </g>
            )}
            {shaded === "Acomp" && (
              <g>
                <circle cx={cx2} cy={cy} r={r} fill={SHADE} fillOpacity="0.32" />
                <circle cx={cx1} cy={cy} r={r} fill="var(--surface)" />
              </g>
            )}
          </g>
        )}

        {/* full A */}
        {showA && (
          <circle cx={cx1} cy={cy} r={r} fill={SHADE} fillOpacity="0.32" />
        )}
        {/* full B */}
        {showB && (
          <circle cx={cx2} cy={cy} r={r} fill={SHADE} fillOpacity="0.32" />
        )}

        {/* A only (A minus B) */}
        {showAnotB && (
          <g clipPath="url(#venn-A)">
            <rect x="0" y="0" width="260" height="180" fill={SHADE} fillOpacity="0.32" />
            <circle cx={cx2} cy={cy} r={r} fill="var(--surface)" />
          </g>
        )}
        {/* B only (B minus A) */}
        {showBnotA && (
          <g clipPath="url(#venn-B)">
            <rect x="0" y="0" width="260" height="180" fill={SHADE} fillOpacity="0.32" />
            <circle cx={cx1} cy={cy} r={r} fill="var(--surface)" />
          </g>
        )}
        {/* intersection */}
        {showInter && (
          <g clipPath="url(#venn-A)">
            <circle cx={cx2} cy={cy} r={r} fill={SHADE} fillOpacity="0.55" />
          </g>
        )}

        {/* circle outlines */}
        <circle
          cx={cx1}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--fg)"
          strokeOpacity="0.55"
          strokeWidth="1.4"
        />
        <circle
          cx={cx2}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--fg)"
          strokeOpacity="0.55"
          strokeWidth="1.4"
        />

        {/* labels */}
        <text
          x={cx1 - 38}
          y={cy - 38}
          fontFamily="var(--quant-display), serif"
          fontSize="18"
          fill="var(--fg)"
        >
          {aLabel}
        </text>
        <text
          x={cx2 + 22}
          y={cy - 38}
          fontFamily="var(--quant-display), serif"
          fontSize="18"
          fill="var(--fg)"
        >
          {bLabel}
        </text>
        <text
          x={240}
          y={22}
          textAnchor="end"
          fontFamily="var(--quant-display), serif"
          fontSize="13"
          fill="var(--muted)"
        >
          {universe}
        </text>
      </svg>
      {caption && (
        <figcaption className="mt-3 text-center text-[12px] text-[color:var(--muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
