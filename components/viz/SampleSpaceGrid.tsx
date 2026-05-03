import { cn } from "@/lib/cn";

type CellPredicate = (row: number, col: number) => boolean;

type Props = {
  rows?: number;
  cols?: number;
  highlight?: CellPredicate;
  secondary?: CellPredicate;
  cellLabel?: (row: number, col: number) => React.ReactNode;
  rowHeader?: (row: number) => React.ReactNode;
  colHeader?: (col: number) => React.ReactNode;
  rowAxisLabel?: React.ReactNode;
  colAxisLabel?: React.ReactNode;
  caption?: React.ReactNode;
  legend?: { primary?: string; secondary?: string; intersection?: string };
  className?: string;
};

export function SampleSpaceGrid({
  rows = 6,
  cols = 6,
  highlight,
  secondary,
  cellLabel,
  rowHeader,
  colHeader,
  rowAxisLabel,
  colAxisLabel,
  caption,
  legend,
  className,
}: Props) {
  const cells: React.ReactNode[] = [];

  return (
    <figure className={cn("my-6", className)}>
      <div className="overflow-x-auto">
        <table className="mx-auto border-separate border-spacing-0 text-center font-mono text-[12px]">
          {(colAxisLabel || colHeader) && (
            <thead>
              <tr>
                <th className="p-1" />
                {colAxisLabel && (
                  <th
                    colSpan={cols}
                    className="pb-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]"
                  >
                    {colAxisLabel}
                  </th>
                )}
              </tr>
              {colHeader && (
                <tr>
                  <th className="p-1" />
                  {Array.from({ length: cols }).map((_, c) => (
                    <th
                      key={c}
                      className="px-2 py-1 text-[11px] font-semibold text-[color:var(--muted)]"
                    >
                      {colHeader(c)}
                    </th>
                  ))}
                </tr>
              )}
            </thead>
          )}
          <tbody>
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                {rowHeader && (
                  <th
                    scope="row"
                    className="px-2 py-1 text-right text-[11px] font-semibold text-[color:var(--muted)]"
                  >
                    {rowHeader(r)}
                  </th>
                )}
                {Array.from({ length: cols }).map((_, c) => {
                  const isPri = highlight ? highlight(r, c) : false;
                  const isSec = secondary ? secondary(r, c) : false;
                  let bg = "transparent";
                  let border = "var(--rule)";
                  let weight = 400;
                  if (isPri && isSec) {
                    bg = "var(--accent)";
                    border = "var(--accent)";
                    weight = 600;
                  } else if (isPri) {
                    bg = "var(--accent-soft)";
                    border = "var(--accent)";
                  } else if (isSec) {
                    bg = "rgba(11, 11, 18, 0.05)";
                    border = "var(--rule)";
                  }
                  const fg = isPri && isSec ? "var(--accent-fg)" : "var(--fg)";
                  return (
                    <td
                      key={c}
                      className="h-9 w-10 border tabular-nums"
                      style={{
                        background: bg,
                        borderColor: border,
                        color: fg,
                        fontWeight: weight,
                      }}
                    >
                      {cellLabel ? cellLabel(r, c) : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(legend || rowAxisLabel) && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-mono uppercase tracking-[0.14em] text-[color:var(--muted)]">
          {rowAxisLabel && <span>rows: {rowAxisLabel}</span>}
          {legend?.primary && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-sm border"
                style={{
                  background: "var(--accent-soft)",
                  borderColor: "var(--accent)",
                }}
              />
              {legend.primary}
            </span>
          )}
          {legend?.secondary && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-sm border"
                style={{
                  background: "rgba(11, 11, 18, 0.05)",
                  borderColor: "var(--rule)",
                }}
              />
              {legend.secondary}
            </span>
          )}
          {legend?.intersection && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ background: "var(--accent)" }}
              />
              {legend.intersection}
            </span>
          )}
        </div>
      )}
      {caption && (
        <figcaption className="mt-2 text-center text-[12px] leading-relaxed text-[color:var(--muted)]">
          {caption}
        </figcaption>
      )}
      {/* keep the binding so cells var doesn't lint as unused — not actually rendered */}
      {cells.length > 0 ? null : null}
    </figure>
  );
}
