import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { DiceHistogram } from "@/components/drills/DiceHistogram";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { curriculum } from "@/lib/curriculum";

const displayClass = "font-[family-name:var(--quant-display)]";

export default function Home() {
  return (
    <div className="flex flex-col">
      <SiteHeader />
      <Hero />
      <Value />
      <CurriculumSection />
      <Testimonial />
      <CtaStrip />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  const totalLessons = curriculum.reduce((n, m) => n + m.lessons.length, 0);
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--rule)]">
      {/* Dot-grid backdrop, masked to right half */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(79,70,229,0.10) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 100% at 75% 50%, black 30%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 70% 100% at 75% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
        <div>
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--accent)]/20 bg-[color:var(--accent-soft)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" aria-hidden />
            {totalLessons} lessons · 7 modules · Free
          </div>

          <h1
            className={`${displayClass} mt-5 text-4xl font-normal leading-[1.03] tracking-tight md:text-[3.5rem]`}
          >
            All you need to{" "}
            <span className="relative inline-block px-[0.12em]">
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-[0.05em] top-[0.2em] -z-10 rounded-[0.22em] bg-[color:var(--accent)]/14"
              />
              ace
            </span>{" "}
            your interviews.
            <br />
            <span className="text-[0.86em] italic text-[color:var(--muted)]">
              Learn, don&rsquo;t memorize.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[color:var(--muted)]">
            Bayesics is a probability course for people shipping models in
            production. Every concept arrives as a simulator you can break —
            no passive videos, no hand-waving through the math.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/curriculum"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-semibold text-[color:var(--accent-fg)] shadow-[var(--shadow-accent)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-accent-hover)]"
            >
              Start the curriculum
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="#curriculum"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rule)] bg-white px-5 py-2.5 text-sm font-medium text-[color:var(--fg)] shadow-[var(--shadow-xs)] transition hover:border-[color:var(--accent)]/25 hover:shadow-[var(--shadow-sm)]"
            >
              Browse modules
            </Link>
          </div>

          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted)]/70">
            No signup required · progress saved in browser
          </p>
        </div>

        {/* Simulator widget */}
        <div className="relative">
          <div className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-[color:var(--accent)]/5 blur-3xl" />
          <div className="overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-white/90 p-6 shadow-[var(--shadow-card)] ring-1 ring-black/[0.03] backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Law of large numbers
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--muted)]/70">
                <span className="relative flex h-1.5 w-1.5" aria-hidden>
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Live
              </div>
            </div>
            <DiceHistogram />
          </div>
        </div>
      </div>
    </section>
  );
}

function Value() {
  const items = [
    {
      number: "01",
      title: "Simulators before formulas.",
      copy: "Drag a slider, watch the posterior update in real time. You internalize the math before you ever write it down.",
    },
    {
      number: "02",
      title: "Drills built for the job.",
      copy: "Rewrite a classifier threshold. Reason about calibration. Compute a posterior update under label noise — the exact problems you hit at work.",
    },
    {
      number: "03",
      title: "Rigor that sticks.",
      copy: "Formal definitions, worked proofs, and a reference you can paste straight into a doc. No hand-waving, ever.",
    },
  ];
  return (
    <section id="value" className="border-b border-[color:var(--rule)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Why it works
          </div>
          <h2 className={`${displayClass} mt-3 max-w-xl text-3xl font-normal leading-tight md:text-4xl`}>
            Built for engineers who learn by doing.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.number}
              className="relative overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-8"
            >
              <div
                aria-hidden
                className={`${displayClass} pointer-events-none absolute -right-3 -top-5 select-none text-[120px] font-normal leading-none text-[color:var(--accent)]/[0.055]`}
              >
                {it.number}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent)]">
                {it.number}
              </div>
              <h3 className={`${displayClass} mt-3 text-xl font-normal leading-snug`}>
                {it.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--muted)]">
                {it.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const moduleAccents = [
  "from-violet-500/10 to-indigo-500/5",
  "from-indigo-500/10 to-sky-500/5",
  "from-sky-500/10 to-cyan-500/5",
  "from-teal-500/10 to-emerald-500/5",
  "from-amber-500/10 to-orange-500/5",
  "from-rose-500/10 to-pink-500/5",
  "from-purple-500/10 to-violet-500/5",
];

function CurriculumSection() {
  const totalLessons = curriculum.reduce((n, m) => n + m.lessons.length, 0);
  return (
    <section id="curriculum" className="border-b border-[color:var(--rule)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Curriculum
            </div>
            <h2 className={`${displayClass} mt-3 text-3xl font-normal md:text-4xl`}>
              {totalLessons} lessons. Seven modules. One arc.
            </h2>
          </div>
          <Link
            href="/curriculum"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--accent)] transition hover:underline"
          >
            See all modules
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {curriculum.map((m) => {
            const preview = m.lessons.slice(0, 3);
            const more = m.lessons.length - preview.length;
            const accent = moduleAccents[(m.number - 1) % moduleAccents.length];
            return (
              <Link
                key={m.id}
                href={`/curriculum/${m.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-white shadow-[var(--shadow-xs)] transition hover:-translate-y-0.5 hover:border-[color:var(--accent)]/25 hover:shadow-[var(--shadow-card-hover)]"
              >
                {/* Gradient header band */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${accent}`} />

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                      Module {String(m.number).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] text-[color:var(--muted)]/70">
                      {m.lessons.length} lessons
                    </span>
                  </div>
                  <h3 className={`${displayClass} mt-2 text-xl leading-tight`}>
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--muted)]">
                    {m.tagline}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-[color:var(--rule)] pt-4 text-[13px] text-[color:var(--muted)]">
                    {preview.map((l) => (
                      <li key={l.id} className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] uppercase opacity-45">
                          {String(l.order).padStart(2, "0")}
                        </span>
                        <span>{l.title}</span>
                      </li>
                    ))}
                    {more > 0 && (
                      <li className="font-mono text-[11px] text-[color:var(--accent)]/80">
                        +{more} more
                      </li>
                    )}
                  </ul>

                  <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[color:var(--muted)] transition group-hover:text-[color:var(--accent)]">
                    Open module
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section id="testimonial" className="border-b border-[color:var(--rule)]">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="relative overflow-hidden rounded-2xl bg-[color:var(--surface)] px-8 py-14 md:px-16">
          {/* Decorative quotation mark */}
          <div
            aria-hidden
            className={`${displayClass} pointer-events-none absolute -top-6 left-8 select-none text-[160px] leading-none text-[color:var(--accent)]/[0.07] md:left-14`}
          >
            &ldquo;
          </div>

          <div className="relative">
            <blockquote
              className={`${displayClass} text-2xl font-normal leading-relaxed text-[color:var(--fg)] md:text-[1.9rem]`}
            >
              Every page does the same thing — give me a slider before a
              formula. I retained more from one weekend than three years of
              coursework.
            </blockquote>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[color:var(--rule)]" />
              <div className="text-[13px] text-[color:var(--muted)]">
                ML engineer &middot; early-access reviewer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaStrip() {
  const totalLessons = curriculum.reduce((n, m) => n + m.lessons.length, 0);
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="relative overflow-hidden rounded-2xl bg-[color:var(--accent)] px-10 py-14 md:px-16">
          {/* Dot-grid overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              WebkitMaskImage:
                "radial-gradient(ellipse 100% 100% at 90% 50%, black 30%, transparent 80%)",
              maskImage:
                "radial-gradient(ellipse 100% 100% at 90% 50%, black 30%, transparent 80%)",
            }}
          />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2
                className={`${displayClass} text-3xl font-normal text-white md:text-4xl`}
              >
                Start learning today.
                <br />
                <span className="opacity-70">It&apos;s completely free.</span>
              </h2>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/70">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-white/90" aria-hidden />
                  No account needed
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-white/90" aria-hidden />
                  {totalLessons} lessons across 7 modules
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-white/90" aria-hidden />
                  Progress saved in your browser
                </span>
              </div>
            </div>
            <Link
              href="/curriculum"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[color:var(--accent)] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.30)]"
            >
              Open the curriculum
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
