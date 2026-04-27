import Link from "next/link";
import { ArrowRight, Check, Code2 } from "lucide-react";
import { DiceHistogram } from "@/components/drills/DiceHistogram";

const displayClass = "font-[family-name:var(--quant-display)]";
const logoClass = "font-[family-name:var(--font-logo)]";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Nav />
      <Hero />
      <Value />
      <Curriculum />
      <Testimonial />
      <CtaStrip />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--rule)] bg-[color:var(--bg)]/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="QuantBayesics — home" className="flex items-center gap-1.5">
          <LogoMark className="h-14 w-14" />
          <Wordmark className="relative -top-[2px] text-[32px]" />
        </Link>
        <div className="hidden items-center gap-9 sm:flex">
          <nav className="flex items-center gap-9 text-[15px] text-[color:var(--muted)]">
            <a
              href="#premium"
              className="font-semibold text-[color:var(--accent)] transition hover:opacity-80"
            >
              Premium
            </a>
            <a href="#curriculum" className="transition hover:text-[color:var(--fg)]">
              Curriculum
            </a>
            <a href="#" className="transition hover:text-[color:var(--fg)]">
              Sign In
            </a>
          </nav>
          <Link
            href="/bayes"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-[color:var(--accent-fg)] shadow-[0_14px_30px_-18px_rgba(79,70,229,0.95)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-18px_rgba(79,70,229,0.95)]"
          >
            Get Started
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </header>
  );
}

function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="QuantBayesics"
    >
      {/* left face (2) */}
      <path
        d="M 8 11.5 L 16 16 L 16 25 L 8 20.5 Z"
        fill="#c9c3f1"
      />
      {/* right face (3) */}
      <path
        d="M 16 16 L 24 11.5 L 24 20.5 L 16 25 Z"
        fill="#d8d1f8"
      />
      {/* top face (1) */}
      <path
        d="M 16 7 L 24 11.5 L 16 16 L 8 11.5 Z"
        fill="#ece8ff"
      />
      {/* silhouette + Y of internal edges meeting at front vertex */}
      <path
        d="M 16 7 L 24 11.5 L 24 20.5 L 16 25 L 8 20.5 L 8 11.5 Z M 8 11.5 L 16 16 L 24 11.5 M 16 16 L 16 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* pips — ellipses foreshortened to the plane of each face */}
      <g fill="currentColor">
        {/* top: 1 pip — wider than tall (face aspect ≈ 16:9) */}
        <ellipse cx="16" cy="11.45" rx="1.48" ry="0.84" />
        {/* left face: 2 pips — major axis at +60° to follow face plane */}
        <ellipse cx="10.9" cy="15.8" rx="1.28" ry="0.75" transform="rotate(60 10.9 15.8)" />
        <ellipse cx="13.4" cy="20.1" rx="1.28" ry="0.75" transform="rotate(60 13.4 20.1)" />
        {/* right face: 3 pips — major axis at -60° (mirrored) */}
        <ellipse cx="21.55" cy="15.1" rx="1.28" ry="0.75" transform="rotate(-60 21.55 15.1)" />
        <ellipse cx="19.85" cy="18.15" rx="1.28" ry="0.75" transform="rotate(-60 19.85 18.15)" />
        <ellipse cx="18.15" cy="21.2" rx="1.28" ry="0.75" transform="rotate(-60 18.15 21.2)" />
      </g>
    </svg>
  );
}

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`${logoClass} inline-block text-[26px] font-[550] leading-none tracking-[-0.02em] text-[color:var(--fg)] ${className}`}
    >
      QuantBayesics
    </span>
  );
}

function Hero() {
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
              Learn, don&apos;t memorize.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[color:var(--muted)]">
            QuantBayesics is a probability course for people shipping models in
            production. Every lesson pairs a live simulator with a drill — no passive
            videos, no hand-waving through the math.
          </p>
          <div className="mt-[3.75rem] flex flex-wrap items-center gap-3">
            <Link
              href="/bayes"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-semibold text-[color:var(--accent-fg)] transition hover:opacity-90"
            >
              Try the Bayes lesson
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href="#curriculum"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rule)] px-5 py-2.5 text-sm font-medium text-[color:var(--fg)] transition hover:bg-[color:var(--surface)]"
            >
              Browse the curriculum
            </a>
          </div>
          <p className="mt-4 text-xs text-[color:var(--muted)]">
            Free lessons · no card required · premium drills unlock with Pro.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-[color:var(--accent-soft)] blur-2xl" />
          <div className="rounded-2xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-6 shadow-[0_40px_80px_-40px_rgba(79,70,229,0.35)]">
            <div className="mb-4 flex items-baseline justify-between">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Law of large numbers
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
      title: "Prior, likelihood, posterior — in your hands.",
      copy:
        "Every probability idea arrives as a simulator you can break. You feel the math before you formalize it.",
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

function Curriculum() {
  const tracks = [
    {
      label: "Foundations",
      items: [
        "Sample spaces & events",
        "Conditional probability",
        "Bayes' rule",
        "Independence & chain rule",
      ],
      free: [0, 1, 2, 3],
    },
    {
      label: "Random variables",
      items: [
        "Discrete distributions",
        "Expectation & variance",
        "Joint & marginal",
        "Transformations",
      ],
      free: [0, 1],
    },
    {
      label: "Inference",
      items: [
        "MLE & MAP",
        "Conjugate priors",
        "Posterior sampling",
        "Credible intervals",
      ],
      free: [0],
    },
  ];
  return (
    <section id="curriculum" className="border-b border-[color:var(--rule)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Curriculum · preview
            </div>
            <h2 className={`${displayClass} mt-3 text-3xl font-normal md:text-4xl`}>
              Forty lessons. One coherent arc.
            </h2>
          </div>
          <Link
            href="/bayes"
            className="text-sm font-medium text-[color:var(--accent)] hover:underline"
          >
            Jump to Bayes&rsquo; rule →
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-[color:var(--rule)] bg-[color:var(--rule)] md:grid-cols-3">
          {tracks.map((t) => (
            <div key={t.label} className="bg-[color:var(--surface)] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">
                  {t.label}
                </h3>
                <span className="text-[10px] font-mono text-[color:var(--muted)]">
                  {t.items.length} lessons
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-[13px]">
                {t.items.map((item, i) => {
                  const isFree = t.free.includes(i);
                  return (
                    <li key={item} className="flex items-center justify-between gap-3">
                      <span className={isFree ? "text-[color:var(--fg)]" : "text-[color:var(--muted)]"}>
                        {item}
                      </span>
                      <span
                        className={
                          isFree
                            ? "text-[9px] font-mono uppercase tracking-[0.14em] text-[color:var(--accent)]"
                            : "text-[9px] font-mono uppercase tracking-[0.14em] text-[color:var(--muted)]"
                        }
                      >
                        {isFree ? "free" : "pro"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section id="testimonial" className="border-b border-[color:var(--rule)]">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--muted)]">
          From the early cohort
        </div>
        <blockquote className={`${displayClass} mt-6 text-2xl leading-relaxed md:text-3xl`}>
          &ldquo;The medical-test simulator on the Bayes page did more for my intuition
          than three years of coursework. I sent it to my whole team.&rdquo;
        </blockquote>
        <div className="mt-6 text-sm text-[color:var(--muted)]">
          ML Engineer · early-access reviewer
        </div>
      </div>
    </section>
  );
}

function CtaStrip() {
  const perks = ["No card required", "Open the simulator in 10 seconds", "Cancel Pro anytime"];
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-10 md:p-14">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className={`${displayClass} text-3xl md:text-4xl`}>
                Start with Bayes. Stay for the rest.
              </h2>
              <div className="mt-4 flex flex-wrap gap-4 text-[13px] text-[color:var(--muted)]">
                {perks.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[color:var(--accent)]" aria-hidden />
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/bayes"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-[color:var(--accent-fg)] transition hover:opacity-90"
            >
              Try the Bayes lesson
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[color:var(--rule)] text-[12px] text-[color:var(--muted)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-7 w-7" />
          <Wordmark />
          <span className="ml-2">· © 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <a className="inline-flex items-center gap-1.5 hover:text-[color:var(--fg)]" href="#">
            <Code2 className="h-3.5 w-3.5" aria-hidden />
            Open examples
          </a>
        </div>
      </div>
    </footer>
  );
}
