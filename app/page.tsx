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
    <section className="border-b border-[color:var(--rule)]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
        <div>
          <h1
            className={`${displayClass} text-4xl font-normal leading-[1.02] tracking-tight md:text-[3.5rem]`}
          >
            All you need to{" "}
            <span className="relative inline-block px-[0.16em] text-[color:var(--fg)]">
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-[0.06em] top-[0.18em] -z-10 rounded-[0.28em] bg-[color:var(--accent)]/18"
              />
              ace
            </span>{" "}
            your interviews.
            <br />
            <span className="text-[0.88em] italic text-[color:var(--muted)]">
              Learn, don&rsquo;t memorize.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[color:var(--muted)]">
            Bayesics is a probability course for people shipping models in
            production. Every concept arrives as a simulator you can break — no
            passive videos, no hand-waving through the math.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/curriculum"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-semibold text-[color:var(--accent-fg)] shadow-[0_14px_30px_-18px_rgba(79,70,229,0.95)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-18px_rgba(79,70,229,0.95)]"
            >
              Start the curriculum
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="#curriculum"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rule)] px-5 py-2.5 text-sm font-medium text-[color:var(--fg)] transition hover:bg-[color:var(--surface)]"
            >
              Browse modules
            </Link>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
            Free · {totalLessons} lessons · 7 modules
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-[color:var(--accent-soft)] blur-2xl" />
          <div className="rounded-2xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-6 shadow-[0_40px_80px_-40px_rgba(79,70,229,0.35)]">
            <div className="mb-4 flex items-baseline justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Law of large numbers
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]/80">
                live simulator
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
      eyebrow: "01",
      title: "Every concept arrives as a simulator you can break.",
      copy:
        "Drag a slider, watch the posterior move. You feel the math before you formalize it.",
    },
    {
      eyebrow: "02",
      title: "Drills that match your day job.",
      copy:
        "Rewrite a classifier threshold. Reason about calibration. Compute a posterior update under label noise.",
    },
    {
      eyebrow: "03",
      title: "Rigor you can reference later.",
      copy:
        "No hand-waving. Formal definitions, worked proofs, and a cheatsheet you can paste into docs.",
    },
  ];
  return (
    <section id="value" className="border-b border-[color:var(--rule)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--muted)]">
              What you get
            </div>
            <h2 className={`${displayClass} mt-4 text-3xl font-normal leading-tight md:text-4xl`}>
              The probability course for the work you actually do.
            </h2>
          </div>
          <div className="grid gap-10">
            {items.map((it) => (
              <div key={it.eyebrow} className="border-t border-[color:var(--rule)] pt-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  {it.eyebrow}
                </div>
                <h3 className={`${displayClass} mt-2 text-xl font-normal leading-snug`}>
                  {it.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--muted)]">
                  {it.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CurriculumSection() {
  const totalLessons = curriculum.reduce((n, m) => n + m.lessons.length, 0);
  return (
    <section id="curriculum" className="border-b border-[color:var(--rule)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Curriculum
            </div>
            <h2 className={`${displayClass} mt-3 text-3xl font-normal md:text-4xl`}>
              {totalLessons} lessons. Seven modules. One arc.
            </h2>
          </div>
          <Link
            href="/curriculum"
            className="text-sm font-medium text-[color:var(--accent)] hover:underline"
          >
            Open the curriculum →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {curriculum.map((m) => {
            const preview = m.lessons.slice(0, 3);
            const more = m.lessons.length - preview.length;
            return (
              <Link
                key={m.id}
                href={`/curriculum/${m.slug}`}
                className="group flex flex-col rounded-2xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-6 transition hover:border-[color:var(--accent)]/40 hover:bg-white"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Module {String(m.number).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] text-[color:var(--muted)]">
                    {m.lessons.length} lessons
                  </span>
                </div>
                <h3 className={`${displayClass} mt-2 text-xl leading-tight`}>
                  {m.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[color:var(--muted)]">
                  {m.tagline}
                </p>
                <ul className="mt-4 space-y-1.5 text-[13px] text-[color:var(--muted)]">
                  {preview.map((l) => (
                    <li key={l.id} className="flex items-baseline gap-2">
                      <span className="font-mono text-[10px] uppercase opacity-60">
                        {String(l.order).padStart(2, "0")}
                      </span>
                      <span>{l.title}</span>
                    </li>
                  ))}
                  {more > 0 && (
                    <li className="font-mono text-[11px] text-[color:var(--accent)]">
                      + {more} more
                    </li>
                  )}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[color:var(--fg)] transition group-hover:text-[color:var(--accent)]">
                  Open module
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
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
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
          From the early cohort
        </div>
        <blockquote
          className={`${displayClass} mt-6 text-2xl leading-relaxed md:text-3xl`}
        >
          &ldquo;Every page does the same thing — give me a slider before a
          formula. I retained more from one weekend than three years of
          coursework.&rdquo;
        </blockquote>
        <div className="mt-6 text-sm text-[color:var(--muted)]">
          ML engineer &middot; early-access reviewer
        </div>
      </div>
    </section>
  );
}

function CtaStrip() {
  const totalLessons = curriculum.reduce((n, m) => n + m.lessons.length, 0);
  const perks = [
    "No signup required",
    `All ${totalLessons} lessons · free`,
    "Progress tracked locally",
  ];
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-10 md:p-14">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className={`${displayClass} text-3xl md:text-4xl`}>
                Build real probability fluency.
              </h2>
              <div className="mt-4 flex flex-wrap gap-4 text-[13px] text-[color:var(--muted)]">
                {perks.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1.5">
                    <Check
                      className="h-3.5 w-3.5 text-[color:var(--accent)]"
                      aria-hidden
                    />
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/curriculum"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-[color:var(--accent-fg)] shadow-[0_14px_30px_-18px_rgba(79,70,229,0.95)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-18px_rgba(79,70,229,0.95)]"
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
