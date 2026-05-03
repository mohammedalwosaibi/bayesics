import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { MonteCarloBayes } from "@/components/drills/MonteCarloBayes";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("conditional", "bayes-pitfalls");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The same Bayes formula causes the same mistakes over and over again.
          Two are worth memorizing because they show up in court rooms,
          newsrooms, and AI-fairness debates almost weekly.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          1. Base-rate fallacy
        </h2>
        <p className="text-[15px] leading-[1.75]">
          People hear "99% accurate test" and reach for "99% chance the
          person has the disease." They've forgotten the prior — the base
          rate of the disease in the population. When the prior is small,
          even an accurate test can produce mostly false positives.
        </p>
        <p className="text-[15px] leading-[1.75]">
          The fix is to write Bayes out explicitly. The denominator includes{" "}
          <em>both</em> sources of positives:
        </p>
        <TexBlock tex="P(D \mid +) = \frac{\overbrace{P(+ \mid D)}^{\text{sensitivity}} \cdot \overbrace{P(D)}^{\text{prior}}}{\underbrace{P(+ \mid D)P(D)}_{\text{true +}} + \underbrace{P(+ \mid D^c)P(D^c)}_{\text{false +}}}" />
      </section>

      <section className="space-y-4">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          See it in simulation
        </h2>
        <MonteCarloBayes />
        <p className="text-[14px] leading-relaxed text-[color:var(--muted)]">
          Crank up the prior and the posterior leaps; drop it and even strong
          evidence struggles. That's the base rate doing the heavy lifting.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          2. The prosecutor's fallacy
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Suppose a DNA match has a 1-in-1,000,000 random-match probability.
          A prosecutor says "there's only a 1-in-a-million chance the
          defendant is innocent." That's confusing two very different
          conditionals:
        </p>
        <TexBlock tex="P(\text{match} \mid \text{innocent}) \neq P(\text{innocent} \mid \text{match})." />
        <p className="text-[15px] leading-[1.75]">
          To get the second, you also need the prior probability the
          defendant was guilty before the DNA evidence — which depends on{" "}
          <em>how the defendant was selected</em>. If the database has
          millions of suspects, lots of innocent people will match.
        </p>
      </section>

      <Callout tone="trap" title="Always ask for both numbers">
        <p>
          When someone gives you a conditional probability, ask: which
          direction? <Tex tex="P(\text{evidence} \mid \text{hypothesis})" /> ?
          Or <Tex tex="P(\text{hypothesis} \mid \text{evidence})" /> ? Without
          the prior, you cannot translate one into the other. Most "shocking"
          probability claims hinge on this slip.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          A defensive heuristic
        </h2>
        <ol className="ml-5 list-decimal space-y-1 text-[15px] leading-[1.75]">
          <li>What's the prior — the base rate of the hypothesis?</li>
          <li>What's the likelihood — how plausible is the evidence under each hypothesis?</li>
          <li>Multiply, normalize, sanity-check against a counting argument over a population.</li>
        </ol>
      </section>
    </LessonShell>
  );
}
