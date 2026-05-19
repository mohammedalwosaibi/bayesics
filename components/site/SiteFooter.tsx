import Link from "next/link";
import { LogoMark, Wordmark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--rule)] text-[12px] text-[color:var(--muted)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-7">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-7 w-7 opacity-80" />
          <Wordmark className="text-[19px] opacity-80" />
          <span className="ml-1.5 opacity-60">© 2026</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/curriculum"
            className="transition hover:text-[color:var(--fg)]"
          >
            Curriculum
          </Link>
        </div>
      </div>
    </footer>
  );
}
