import Link from "next/link";
import { LogoMark, Wordmark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--rule)] text-[12px] text-[color:var(--muted)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-7 w-7" />
          <Wordmark className="text-[20px]" />
          <span className="ml-2">© 2026</span>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/curriculum"
            className="transition hover:text-[color:var(--fg)]"
          >
            Curriculum
          </Link>
          <span
            aria-disabled="true"
            className="inline-flex cursor-default items-center gap-1.5"
            title="Premium tier coming soon"
          >
            Premium
            <span className="rounded-full border border-[color:var(--rule)] px-1.5 py-[1px] font-mono text-[9px] uppercase tracking-[0.16em]">
              soon
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
