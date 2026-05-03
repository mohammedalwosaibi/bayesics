import { cn } from "@/lib/cn";

type TransitionState = {
  id: string;
  label: string;
  x: number;
  y: number;
};

type TransitionEdge = {
  from: string;
  to: string;
  prob: string;
  bend?: number;
};

type Props = {
  states: TransitionState[];
  edges: TransitionEdge[];
  caption?: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
};

const NODE_R = 24;

function polarPoint(cx: number, cy: number, radius: number, angle: number) {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

export function TransitionDiagram({
  states,
  edges,
  caption,
  className,
  width = 420,
  height = 240,
}: Props) {
  const byId = new Map(states.map((state) => [state.id, state]));

  return (
    <figure className={cn("my-6", className)}>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="mx-auto block h-auto w-full max-w-xl"
          role="img"
          aria-label="Transition diagram"
        >
          <defs>
            <marker
              id="transition-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L8,3 z" fill="var(--accent)" />
            </marker>
          </defs>

          {edges.map((edge, idx) => {
            const from = byId.get(edge.from);
            const to = byId.get(edge.to);
            if (!from || !to) return null;

            if (from.id === to.id) {
              const loopTop = polarPoint(from.x, from.y, NODE_R, -Math.PI / 2);
              const start = polarPoint(from.x, from.y, NODE_R - 2, -0.2 * Math.PI);
              const end = polarPoint(from.x, from.y, NODE_R - 2, -0.8 * Math.PI);
              const path = [
                `M ${start.x} ${start.y}`,
                `C ${from.x + 34} ${from.y - 54}, ${from.x - 34} ${from.y - 54}, ${end.x} ${end.y}`,
              ].join(" ");
              return (
                <g key={idx}>
                  <path
                    d={path}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                    markerEnd="url(#transition-arrow)"
                  />
                  <text
                    x={loopTop.x}
                    y={loopTop.y - 30}
                    textAnchor="middle"
                    fontFamily="var(--font-jetbrains), monospace"
                    fontSize="11"
                    fill="var(--muted)"
                  >
                    {edge.prob}
                  </text>
                </g>
              );
            }

            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const angle = Math.atan2(dy, dx);
            const start = polarPoint(from.x, from.y, NODE_R, angle);
            const end = polarPoint(to.x, to.y, NODE_R, angle + Math.PI);
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;
            const norm = Math.hypot(dx, dy) || 1;
            const bend = edge.bend ?? 0;
            const controlX = midX - (dy / norm) * bend;
            const controlY = midY + (dx / norm) * bend;
            const labelX = 0.25 * start.x + 0.5 * controlX + 0.25 * end.x;
            const labelY = 0.25 * start.y + 0.5 * controlY + 0.25 * end.y - 8;

            return (
              <g key={idx}>
                <path
                  d={`M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.6"
                  markerEnd="url(#transition-arrow)"
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  fontFamily="var(--font-jetbrains), monospace"
                  fontSize="11"
                  fill="var(--muted)"
                >
                  {edge.prob}
                </text>
              </g>
            );
          })}

          {states.map((state) => (
            <g key={state.id}>
              <circle
                cx={state.x}
                cy={state.y}
                r={NODE_R}
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="1.8"
              />
              <text
                x={state.x}
                y={state.y + 4}
                textAnchor="middle"
                fontFamily="var(--quant-display), serif"
                fontSize="16"
                fill="var(--fg)"
              >
                {state.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[12px] leading-relaxed text-[color:var(--muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
