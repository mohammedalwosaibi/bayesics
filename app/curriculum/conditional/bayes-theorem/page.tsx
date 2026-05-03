import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { TreeDiagram } from "@/components/viz/TreeDiagram";
import { BayesSimulator } from "@/components/drills/BayesSimulator";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("conditional", "bayes-theorem");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          <strong>Bayes' theorem</strong> flips a conditional probability
          around. You know <Tex tex="P(B \mid A)" /> — the chance the
          evidence shows up given the hypothesis. You want{" "}
          <Tex tex="P(A \mid B)" /> — the chance the hypothesis is true given
          the evidence. Bayes is the bridge.
        </p>
        <TexBlock tex="P(A \mid B) = \frac{P(B \mid A) \, P(A)}{P(B)}." />
        <p>
          Combined with the law of total probability for the denominator:
        </p>
        <TexBlock tex="P(A \mid B) = \frac{P(B \mid A) \, P(A)}{\sum_i P(B \mid A_i) \, P(A_i)}." />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          The medical test
        </h2>
        <p className="text-[15px] leading-[1.75]">
          A disease affects <strong>1%</strong> of a population. A test has{" "}
          <strong>99% sensitivity</strong> (chance of a positive given
          disease) and <strong>99% specificity</strong> (chance of a negative
          given no disease). A random person tests positive. What's the
          probability they have the disease?
        </p>
        <TreeDiagram
          root="Person"
          branches={[
            {
              label: "Disease",
              prob: "0.01",
              children: [
                { label: "+", prob: "0.99", leafLabel: "0.01 · 0.99 = 0.0099" },
                { label: "−", prob: "0.01", leafLabel: "0.01 · 0.01 = 0.0001" },
              ],
            },
            {
              label: "Healthy",
              prob: "0.99",
              children: [
                { label: "+", prob: "0.01", leafLabel: "0.99 · 0.01 = 0.0099" },
                { label: "−", prob: "0.99", leafLabel: "0.99 · 0.99 = 0.9801" },
              ],
            },
          ]}
          caption={
            <span>
              Among positives, half come from the (small) sick branch and
              half from the (large) healthy branch.
            </span>
          }
        />
        <TexBlock tex="P(D \mid +) = \frac{0.01 \cdot 0.99}{0.01 \cdot 0.99 + 0.99 \cdot 0.01} = 0.5." />
        <p className="text-[15px] leading-[1.75]">
          Despite the 99% test, a positive only puts you at <strong>50/50</strong>
          . The base rate (1% prior) drowns out the test's accuracy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Play with the priors
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Slide the priors and likelihoods to see how the posterior moves.
          Notice how a tiny prior pulls the posterior down even when the
          evidence is strong.
        </p>
        <BayesSimulator />
      </section>

      <Callout tone="note" title="Posterior ∝ likelihood × prior">
        <p>
          The numerator is the <em>likelihood</em>{" "}
          <Tex tex="P(B \mid A)" /> times the <em>prior</em>{" "}
          <Tex tex="P(A)" />. The denominator is just a normalizer that
          forces the posterior to sum to 1 across hypotheses. When comparing{" "}
          <em>two</em> hypotheses, you can ignore the denominator and just
          compare numerators.
        </p>
      </Callout>
    </LessonShell>
  );
}
