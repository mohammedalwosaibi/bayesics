import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ModuleProgress } from "@/components/lesson/ModuleProgress";
import { LessonCheck } from "@/components/lesson/LessonCheck";
import type { ModuleMeta } from "@/lib/curriculum";

const displayClass = "font-[family-name:var(--quant-display)]";

export function ModuleOverview({ module: m }: { module: ModuleMeta }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="grow">
        <section className="border-b border-[color:var(--rule)]">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <Link
              href="/curriculum"
              className="inline-flex items-center gap-1.5 text-[12px] text-[color:var(--muted)] transition hover:text-[color:var(--fg)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              All modules
            </Link>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
              Module {String(m.number).padStart(2, "0")}
            </div>
            <h1 className={`${displayClass} mt-2 text-4xl leading-tight md:text-5xl`}>
              {m.title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--muted)]">
              {m.tagline}
            </p>
            <div className="mt-6">
              <ModuleProgress module={m} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12">
          <ol className="space-y-3">
            {m.lessons.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/curriculum/${m.slug}/${l.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-5 transition hover:border-[color:var(--accent)]/40 hover:bg-white"
                >
                  <LessonCheck lessonId={l.id} order={l.order} />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                      {l.eyebrow}
                    </div>
                    <div className={`${displayClass} mt-1 text-xl`}>
                      {l.title}
                    </div>
                    <p className="mt-1 text-[14px] leading-relaxed text-[color:var(--muted)]">
                      {l.blurb}
                    </p>
                  </div>
                  <ArrowRight
                    className="mt-2 h-4 w-4 shrink-0 text-[color:var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-[color:var(--accent)]"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/curriculum/${m.slug}/unit-test`}
                className="group flex items-start gap-4 rounded-xl border border-dashed border-[color:var(--accent)]/40 bg-[color:var(--accent-soft)] p-5 transition hover:bg-[color:var(--accent-soft)]/80"
              >
                <span
                  className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)] text-[color:var(--accent-fg)]"
                  aria-hidden
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                    Unit test
                  </div>
                  <div className={`${displayClass} mt-1 text-xl`}>
                    Module {m.number} unit test
                  </div>
                  <p className="mt-1 text-[14px] leading-relaxed text-[color:var(--muted)]">
                    One synthesis question. Required to mark the module
                    complete.
                  </p>
                </div>
                <ArrowRight
                  className="mt-2 h-4 w-4 shrink-0 text-[color:var(--accent)] transition group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          </ol>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
