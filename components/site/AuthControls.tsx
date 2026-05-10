"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { StreakBadge } from "./StreakBadge";

export function AuthControls() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div className="h-9 w-[140px]" aria-hidden />;
  }

  if (!isSignedIn) {
    return (
      <>
        <Link
          href="/sign-in"
          className="text-sm text-[color:var(--muted)] transition hover:text-[color:var(--fg)]"
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-[color:var(--accent-fg)] shadow-[0_14px_30px_-18px_rgba(79,70,229,0.95)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-18px_rgba(79,70,229,0.95)]"
        >
          Get started
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </>
    );
  }

  return (
    <>
      <StreakBadge />
      <UserButton appearance={{ elements: { avatarBox: "h-9 w-9" } }} />
    </>
  );
}
