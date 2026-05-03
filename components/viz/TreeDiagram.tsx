import { cn } from "@/lib/cn";

export type TreeBranch = {
  label: string;
  prob: string;
  children?: TreeBranch[];
  leafLabel?: string;
};

type Props = {
  root?: string;
  branches: TreeBranch[];
  caption?: React.ReactNode;
  className?: string;
};

const NODE_R = 6;

function countLeaves(b: TreeBranch): number {
  if (!b.children || b.children.length === 0) return 1;
  return b.children.reduce((n, c) => n + countLeaves(c), 0);
}

export function TreeDiagram({ root = "Start", branches, caption, className }: Props) {
  const totalLeaves = branches.reduce((n, b) => n + countLeaves(b), 0);
  const width = 520;
  const colWidth = width / 4;
  const rowHeight = 56;
  const height = Math.max(180, totalLeaves * rowHeight + 30);

  // Layout: root at x=40, level-1 nodes at colWidth, level-2 at 2*colWidth, leaves at 3*colWidth.
  const xRoot = 40;
  const xL1 = xRoot + colWidth;
  const xL2 = xL1 + colWidth;
  const xLeaf = xL2 + colWidth;
  const yMid = height / 2;

  type Edge = { x1: number; y1: number; x2: number; y2: number; label: string; prob: string };
  type Node = { x: number; y: number; label: string };
  type Leaf = { x: number; y: number; label: string };

  const edges: Edge[] = [];
  const nodes: Node[] = [{ x: xRoot, y: yMid, label: root }];
  const leafPoints: Leaf[] = [];

  // Build positions for level-1 children.
  let leafCursor = 0;
  for (const b1 of branches) {
    const leaves1 = countLeaves(b1);
    const yStart = 30 + leafCursor * rowHeight;
    const yEnd = yStart + (leaves1 - 1) * rowHeight;
    const yL1 = (yStart + yEnd) / 2;
    nodes.push({ x: xL1, y: yL1, label: b1.label });
    edges.push({ x1: xRoot, y1: yMid, x2: xL1, y2: yL1, label: b1.label, prob: b1.prob });

    if (!b1.children || b1.children.length === 0) {
      leafPoints.push({ x: xLeaf, y: yL1, label: b1.leafLabel ?? "" });
      leafCursor += 1;
      continue;
    }

    let leafCursor2 = 0;
    for (const b2 of b1.children) {
      const leaves2 = countLeaves(b2);
      const yStart2 = yStart + leafCursor2 * rowHeight;
      const yEnd2 = yStart2 + (leaves2 - 1) * rowHeight;
      const yL2 = (yStart2 + yEnd2) / 2;
      nodes.push({ x: xL2, y: yL2, label: b2.label });
      edges.push({ x1: xL1, y1: yL1, x2: xL2, y2: yL2, label: b2.label, prob: b2.prob });
      leafPoints.push({ x: xLeaf, y: yL2, label: b2.leafLabel ?? "" });
      leafCursor2 += leaves2;
    }
    leafCursor += leaves1;
  }

  return (
    <figure className={cn("my-6", className)}>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width + 60} ${height}`}
          className="block w-full h-auto"
          role="img"
          aria-label="Probability tree"
        >
          {edges.map((e, i) => {
            const midX = (e.x1 + e.x2) / 2;
            const midY = (e.y1 + e.y2) / 2 - 6;
            return (
              <g key={i}>
                <line
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke="var(--rule)"
                  strokeWidth="1.2"
                />
                <text
                  x={midX}
                  y={midY}
                  textAnchor="middle"
                  fontFamily="var(--font-jetbrains), monospace"
                  fontSize="10"
                  fill="var(--muted)"
                >
                  {e.label} · {e.prob}
                </text>
              </g>
            );
          })}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle
                cx={n.x}
                cy={n.y}
                r={NODE_R}
                fill="var(--bg)"
                stroke="var(--accent)"
                strokeWidth="1.4"
              />
            </g>
          ))}
          {leafPoints.map((p, i) => (
            <g key={`leaf-${i}`}>
              <text
                x={p.x + 4}
                y={p.y + 4}
                fontFamily="var(--font-jetbrains), monospace"
                fontSize="11"
                fill="var(--fg)"
              >
                {p.label}
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
