import Link from "next/link";
import { AuthControls } from "./AuthControls";

const logoClass = "font-[family-name:var(--font-logo)]";

function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Bayesics">
      <path d="M 8 11.5 L 16 16 L 16 25 L 8 20.5 Z" fill="#c9c3f1" />
      <path d="M 16 16 L 24 11.5 L 24 20.5 L 16 25 Z" fill="#d8d1f8" />
      <path d="M 16 7 L 24 11.5 L 16 16 L 8 11.5 Z" fill="#ece8ff" />
      <path
        d="M 16 7 L 24 11.5 L 24 20.5 L 16 25 L 8 20.5 L 8 11.5 Z M 8 11.5 L 16 16 L 24 11.5 M 16 16 L 16 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <g fill="currentColor">
        <ellipse cx="16" cy="11.45" rx="1.48" ry="0.84" />
        <ellipse cx="10.9" cy="15.8" rx="1.28" ry="0.75" transform="rotate(60 10.9 15.8)" />
        <ellipse cx="13.4" cy="20.1" rx="1.28" ry="0.75" transform="rotate(60 13.4 20.1)" />
        <ellipse cx="21.55" cy="15.1" rx="1.28" ry="0.75" transform="rotate(-60 21.55 15.1)" />
        <ellipse cx="19.85" cy="18.15" rx="1.28" ry="0.75" transform="rotate(-60 19.85 18.15)" />
        <ellipse cx="18.15" cy="21.2" rx="1.28" ry="0.75" transform="rotate(-60 18.15 21.2)" />
      </g>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`${logoClass} inline-block text-[26px] font-[550] leading-none tracking-[-0.02em] text-[color:var(--fg)] ${className}`}
    >
      Bayesics
    </span>
  );
}

export { LogoMark };

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--rule)] bg-[color:var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="Bayesics — home"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <LogoMark className="h-11 w-11" />
          <Wordmark className="relative -top-[1px] text-[27px]" />
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          <nav className="flex items-center gap-7 text-[14px] text-[color:var(--muted)]">
            <Link
              href="/curriculum"
              className="relative py-0.5 transition hover:text-[color:var(--fg)] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[color:var(--accent)] after:transition-[width] after:duration-200 hover:after:w-full"
            >
              Curriculum
            </Link>
          </nav>
          <AuthControls />
        </div>
      </div>
    </header>
  );
}
