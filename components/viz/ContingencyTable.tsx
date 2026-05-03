import { cn } from "@/lib/cn";

type Props = {
  rowLabel: React.ReactNode;
  colLabel: React.ReactNode;
  rowHeaders: React.ReactNode[];
  colHeaders: React.ReactNode[];
  values: number[][];
  caption?: React.ReactNode;
  className?: string;
  emphasizeRows?: number[];
  emphasizeCols?: number[];
  emphasizeCells?: Array<[number, number]>;
};

function fmt(value: number) {
  return Number(value.toFixed(3)).toString();
}

export function ContingencyTable({
  rowLabel,
  colLabel,
  rowHeaders,
  colHeaders,
  values,
  caption,
  className,
  emphasizeRows = [],
  emphasizeCols = [],
  emphasizeCells = [],
}: Props) {
  const rowTotals = values.map((row) => row.reduce((sum, value) => sum + value, 0));
  const colTotals = colHeaders.map((_, colIdx) =>
    values.reduce((sum, row) => sum + (row[colIdx] ?? 0), 0),
  );
  const grandTotal = rowTotals.reduce((sum, value) => sum + value, 0);
  const emphasized = new Set(emphasizeCells.map(([r, c]) => `${r}:${c}`));

  return (
    <figure className={cn("my-6", className)}>
      <div className="overflow-x-auto">
        <table className="mx-auto min-w-[30rem] border-separate border-spacing-0 text-center font-mono text-[12px]">
          <thead>
            <tr>
              <th className="px-3 py-2" />
              <th
                colSpan={colHeaders.length}
                className="px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]"
              >
                {colLabel}
              </th>
              <th className="px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Total
              </th>
            </tr>
            <tr>
              <th className="border-y border-[color:var(--rule)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {rowLabel}
              </th>
              {colHeaders.map((header, colIdx) => {
                const isEmphasized = emphasizeCols.includes(colIdx);
                return (
                  <th
                    key={String(colIdx)}
                    className="border-y border-[color:var(--rule)] px-3 py-2 text-[11px] font-semibold text-[color:var(--muted)]"
                    style={{
                      background: isEmphasized
                        ? "color-mix(in srgb, var(--accent-soft) 70%, white)"
                        : "transparent",
                    }}
                  >
                    {header}
                  </th>
                );
              })}
              <th className="border-y border-[color:var(--rule)] px-3 py-2 text-[11px] font-semibold text-[color:var(--muted)]">
                {<span>&Sigma;</span>}
              </th>
            </tr>
          </thead>
          <tbody>
            {values.map((row, rowIdx) => {
              const rowEmphasized = emphasizeRows.includes(rowIdx);
              return (
                <tr key={String(rowIdx)}>
                  <th
                    scope="row"
                    className="border-b border-[color:var(--rule)] px-3 py-2 text-right text-[11px] font-semibold text-[color:var(--muted)]"
                    style={{
                      background: rowEmphasized
                        ? "color-mix(in srgb, var(--accent-soft) 70%, white)"
                        : "transparent",
                    }}
                  >
                    {rowHeaders[rowIdx]}
                  </th>
                  {row.map((value, colIdx) => {
                    const cellEmphasized =
                      rowEmphasized ||
                      emphasizeCols.includes(colIdx) ||
                      emphasized.has(`${rowIdx}:${colIdx}`);
                    return (
                      <td
                        key={`${rowIdx}:${colIdx}`}
                        className="border-b border-[color:var(--rule)] px-3 py-2 tabular-nums"
                        style={{
                          background: cellEmphasized
                            ? "var(--accent-soft)"
                            : "transparent",
                          color: cellEmphasized ? "var(--fg)" : "var(--muted)",
                          fontWeight: cellEmphasized ? 600 : 400,
                        }}
                      >
                        {fmt(value)}
                      </td>
                    );
                  })}
                  <td
                    className="border-b border-[color:var(--rule)] px-3 py-2 font-semibold tabular-nums"
                    style={{
                      background: rowEmphasized ? "var(--accent-soft)" : "transparent",
                    }}
                  >
                    {fmt(rowTotals[rowIdx])}
                  </td>
                </tr>
              );
            })}
            <tr>
              <th className="px-3 py-2 text-right text-[11px] font-semibold text-[color:var(--muted)]">
                {<span>&Sigma;</span>}
              </th>
              {colTotals.map((value, colIdx) => (
                <td
                  key={`total:${colIdx}`}
                  className="px-3 py-2 font-semibold tabular-nums"
                  style={{
                    background: emphasizeCols.includes(colIdx)
                      ? "var(--accent-soft)"
                      : "transparent",
                  }}
                >
                  {fmt(value)}
                </td>
              ))}
              <td className="px-3 py-2 font-semibold tabular-nums">
                {fmt(grandTotal)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[12px] leading-relaxed text-[color:var(--muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
