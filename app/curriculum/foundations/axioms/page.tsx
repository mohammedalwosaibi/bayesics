import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { VennDiagram } from "@/components/viz/VennDiagram";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("foundations", "axioms");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>probability</strong> is a number we assign to each event.
          Andrey Kolmogorov nailed down what makes that assignment legal with
          three rules — and every probability you'll meet obeys them.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          The three axioms
        </h2>
        <ol className="space-y-3 text-[15px] leading-[1.75]">
          <li>
            <strong>Non-negativity.</strong> For every event{" "}
            <Tex tex="A" />,
            <TexBlock tex="P(A) \geq 0." />
            Probabilities are never negative.
          </li>
          <li>
            <strong>Normalization.</strong> Something in the sample space
            happens for sure:
            <TexBlock tex="P(\Omega) = 1." />
          </li>
          <li>
            <strong>Additivity.</strong> If <Tex tex="A" /> and{" "}
            <Tex tex="B" /> are disjoint (no overlap),
            <TexBlock tex="P(A \cup B) = P(A) + P(B)." />
            More generally, the probability of a finite (or countable) union
            of disjoint events is the sum of their probabilities.
          </li>
        </ol>
      </section>

      <Callout tone="note" title="Why it matters">
        <p>
          Every formula you'll see — Bayes' theorem, the binomial PMF, the law
          of total probability — is a consequence of these three rules. They
          are the only thing you need to assume.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Three quick consequences
        </h2>
        <div className="space-y-4 text-[15px] leading-[1.75]">
          <div>
            <p className="font-semibold">The empty event has probability 0.</p>
            <p>
              <Tex tex="\Omega" /> and <Tex tex="\emptyset" /> are disjoint
              and their union is <Tex tex="\Omega" />, so{" "}
              <Tex tex="P(\Omega) = P(\Omega) + P(\emptyset)" />, forcing{" "}
              <Tex tex="P(\emptyset) = 0" />.
            </p>
          </div>
          <div>
            <p className="font-semibold">Complement rule.</p>
            <p>
              Since <Tex tex="A" /> and <Tex tex="A^c" /> are disjoint and
              cover all of <Tex tex="\Omega" />:
            </p>
            <TexBlock tex="P(A^c) = 1 - P(A)." />
          </div>
          <div>
            <p className="font-semibold">Probabilities live in [0, 1].</p>
            <p>
              From axioms 1 and 2: every <Tex tex="P(A)" /> is between 0 and
              1, never bigger.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          The general union rule (preview)
        </h2>
        <p className="text-[15px] leading-[1.75]">
          When <Tex tex="A" /> and <Tex tex="B" /> <em>do</em> overlap, you
          can't just add — you'd count the overlap twice. The fix is to
          subtract it once back out. That's <strong>inclusion–exclusion</strong>
          , which we'll prove later in this module:
        </p>
        <TexBlock tex="P(A \cup B) = P(A) + P(B) - P(A \cap B)." />
        <VennDiagram
          shaded="AnB"
          labels={{ A: "A", B: "B" }}
          caption={
            <span>
              The overlap counted once on the left, twice on the right — so
              we subtract <Tex tex="P(A \cap B)" /> once.
            </span>
          }
        />
      </section>

      <Callout tone="trap" title="Don't add overlapping probabilities">
        <p>
          If <Tex tex="A" /> = "rolled even" and <Tex tex="B" /> = "rolled
          at least 4," then{" "}
          <Tex tex="P(A) + P(B) = 1/2 + 1/2 = 1" />, but{" "}
          <Tex tex="P(A \cup B) = 4/6 = 2/3" />. The naive sum double-counts
          the outcomes <Tex tex="\{4, 6\}" />.
        </p>
      </Callout>
    </LessonShell>
  );
}
