import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const v = Math.max(0, Math.min(1, value));
  return (
    <span
      className={cn(
        "inline-block h-1 w-20 overflow-hidden rounded-full bg-[color:var(--rule)]",
        className,
      )}
    >
      <span
        className="block h-full rounded-full bg-[color:var(--accent)] transition-[width] duration-300"
        style={{ width: `${v * 100}%` }}
      />
    </span>
  );
}
