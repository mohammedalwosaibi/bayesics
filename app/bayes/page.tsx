import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tex, TexBlock } from "@/components/Math";
import { BayesSimulator } from "@/components/drills/BayesSimulator";
import { McqDrill } from "@/components/drills/McqDrill";
import { LockedPanel } from "@/components/LockedPanel";

const displayClass = "font-[family-name:var(--quant-display)]";

export default function BayesPage() {
  return (
    <div>
      <div className="border-b border-[color:var(--rule)] bg-[color:var(--bg)]">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] text-[color:var(--muted)] transition hover:text-[color:var(--fg)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            QuantBayesics
          </Link>
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--muted)]">
            <span>Foundations · 03 / 04</span>
            <ProgressBar value={0.62} />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 md:grid-cols-[1fr_minmax(0,22rem)] lg:grid-cols-[1fr_minmax(0,26rem)]">
        <article className="min-w-0 max-w-prose space-y-12 pb-20">
          <header>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--accent)]">
              Lesson 03 · Bayes&rsquo; rule
            </div>
            <h1 className={`${displayClass} mt-3 text-4xl leading-tight md:text-5xl`}>
              When a 99% test still gets you wrong.
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--muted)]">
              A medical test has 99% sensitivity and 95% specificity. The disease
              affects 1% of the population. You test positive. What&rsquo;s the chance
              you actually have the disease?
            </p>
            <p className="mt-2 text-[13px] text-[color:var(--muted)]">
              Try the simulator on the right before reading on — then come back.
            </p>
          </header>

          <section>
            <SectionLabel>Intuition</SectionLabel>
            <h2 className={`${displayClass} mt-2 text-2xl`}>
              The denominator is the trick.
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed">
              <p>
                It&rsquo;s tempting to read &ldquo;99% sensitivity&rdquo; and conclude
                that a positive test means a 99% chance of disease. But sensitivity
                only tells you <Tex tex="P(+\mid D)" /> — how the test behaves{" "}
                <em>given</em> the disease.
              </p>
              <p>
                To go the other way, you need every source of positive tests: true
                positives from the 1% who are sick, <em>and</em> false positives from
                the 99% who aren&rsquo;t. Both groups show up in{" "}
                <Tex tex="P(+)" />, and because the healthy group is 99× larger, its
                5% false-positive rate overwhelms the true positives.
              </p>
            </div>
          </section>

          <section>
            <SectionLabel>Formula</SectionLabel>
            <h2 className={`${displayClass} mt-2 text-2xl`}>Bayes&rsquo; rule.</h2>
            <div className="mt-4 rounded-xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-6 text-[color:var(--fg)]">
              <TexBlock tex="P(D \mid +) \;=\; \frac{P(+ \mid D)\,P(D)}{P(+ \mid D)\,P(D) \;+\; P(+ \mid \neg D)\,P(\neg D)}" />
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-[color:var(--muted)]">
              Plugging in: <Tex tex="P(D)=0.01" />, <Tex tex="P(+\mid D)=0.99" />,{" "}
              <Tex tex="P(+\mid\neg D)=0.05" />. The numerator is{" "}
              <Tex tex="0.99 \times 0.01 = 0.0099" />. The denominator is{" "}
              <Tex tex="0.0099 + 0.05 \times 0.99 = 0.0594" />.
            </p>
            <div className="mt-4">
              <TexBlock tex="P(D \mid +) \;=\; \frac{0.0099}{0.0594} \;\approx\; 16.7\%" />
            </div>
          </section>

          <section>
            <SectionLabel>Check your read</SectionLabel>
            <h2 className={`${displayClass} mt-2 text-2xl`}>
              Quick drill.
            </h2>
            <p className="mt-2 text-[14px] text-[color:var(--muted)]">
              Move the sliders around until you can answer this without peeking.
            </p>
            <div className="mt-6 rounded-xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-6">
              <McqDrill
                prompt={
                  <span>
                    Holding sensitivity and specificity fixed, what happens to{" "}
                    <Tex tex="P(D\mid +)" /> as the prior <Tex tex="P(D)" /> falls
                    toward zero?
                  </span>
                }
                options={[
                  { id: "a", label: "It stays the same — sensitivity dominates." },
                  { id: "b", label: "It rises, because rare disease = more informative test." },
                  { id: "c", label: "It falls toward zero, because false positives swamp the true positives." },
                  { id: "d", label: "It flips to 1 − sensitivity." },
                ]}
                correctId="c"
                explanation={
                  <>
                    As <Tex tex="P(D)" /> shrinks, <Tex tex="P(+\mid D)\,P(D)" />{" "}
                    shrinks with it, but <Tex tex="P(+\mid\neg D)\,P(\neg D)" /> stays
                    almost constant. The posterior tracks the ratio — so it too falls
                    toward zero. This is why rare-event detection is hard, not easy.
                  </>
                }
              />
            </div>
          </section>

          <section>
            <SectionLabel>Full solution walkthrough</SectionLabel>
            <h2 className={`${displayClass} mt-2 text-2xl`}>
              See every step, with a second worked example.
            </h2>
            <p className="mt-2 text-[14px] text-[color:var(--muted)]">
              A full derivation, a second example (spam classifier), and the common
              traps production teams hit.
            </p>
            <div className="mt-6">
              <LockedPanel
                tier="Pro"
                label="Unlock the full walkthrough and solution examples."
                cta="Unlock Pro"
                preview={
                  <div className="space-y-3">
                    <div className="h-4 w-2/3 rounded bg-current/30" />
                    <div className="h-4 w-5/6 rounded bg-current/20" />
                    <div className="h-4 w-3/4 rounded bg-current/20" />
                    <div className="mt-4 h-24 rounded-lg bg-current/10" />
                    <div className="h-4 w-4/5 rounded bg-current/20" />
                  </div>
                }
              />
            </div>
          </section>

          <nav className="flex items-center justify-between border-t border-[color:var(--rule)] pt-6 text-[13px]">
            <Link
              href="/"
              className="text-[color:var(--muted)] hover:text-[color:var(--fg)]"
            >
              ← Home
            </Link>
            <span className="text-[color:var(--muted)]">
              Next up: <span className="text-[color:var(--fg)] font-medium">Independence & chain rule</span>
            </span>
          </nav>
        </article>

        <aside className="relative">
          <div className="md:sticky md:top-20">
            <div className="rounded-2xl border border-[color:var(--rule)] bg-[color:var(--surface)] p-6 shadow-[0_30px_60px_-40px_rgba(79,70,229,0.4)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  Companion simulator
                </div>
                <div className="text-[10px] font-mono text-[color:var(--accent)]">live</div>
              </div>
              <BayesSimulator />
              <p className="mt-4 border-t border-[color:var(--rule)] pt-3 text-[11px] leading-relaxed text-[color:var(--muted)]">
                Pull the prior toward 0 to feel why rare-event detection is hard. Pull
                specificity down even a little to watch the posterior collapse.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--muted)]">
      {children}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <span className="inline-block h-1 w-20 overflow-hidden rounded-full bg-[color:var(--rule)]">
      <span
        className="block h-full rounded-full bg-[color:var(--accent)]"
        style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
      />
    </span>
  );
}
