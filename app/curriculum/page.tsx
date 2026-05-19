import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ModuleCard } from "@/components/lesson/ModuleCard";
import { curriculum } from "@/lib/curriculum";

const displayClass = "font-[family-name:var(--quant-display)]";

export const metadata = {
  title: "Curriculum — Bayesics",
  description:
    "Seven modules. Fifty-three lessons. Probability fluency, one drill at a time.",
};

export default function CurriculumPage() {
  const totalLessons = curriculum.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="grow">
        <section className="border-b border-[color:var(--rule)]">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
              Curriculum
            </div>
            <h1
              className={`${displayClass} mt-3 text-4xl leading-tight md:text-5xl`}
            >
              Probability, end to end.
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[color:var(--muted)]">
              Seven modules · {totalLessons} lessons · seven module unit tests.
              Each lesson ends with one short drill. Solve it to mark the lesson
              complete; finish all the lessons <em>and</em> the unit test to
              tick a module.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-[12px] font-mono uppercase tracking-[0.16em] text-[color:var(--muted)]">
              <span className="inline-flex items-center gap-1.5">
                <Check
                  className="h-3.5 w-3.5 text-[color:var(--accent)]"
                  aria-hidden
                />
                Sign in to save progress · daily streak
              </span>
              <span className="opacity-40">·</span>
              <span>Free</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {curriculum.map((m) => (
              <ModuleCard key={m.id} module={m} />
            ))}
          </div>

          <div className="mt-14 border-t border-[color:var(--rule)] pt-8 text-center">
            <Link
              href="/curriculum/foundations/sample-spaces"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-semibold text-[color:var(--accent-fg)] shadow-[var(--shadow-accent)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-accent-hover)]"
            >
              Start with lesson one
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
