import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { DistributionPlot } from "@/components/viz/DistributionPlot";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("discrete", "cdf-discrete");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The <strong>cumulative distribution function</strong> (CDF) gives
          the probability of being <em>at most</em> a given value:
        </p>
        <TexBlock tex="F_X(x) = P(X \leq x) = \sum_{k \leq x} p_X(k)." />
        <p>
          The CDF starts at 0 on the far left, rises in steps at each value
          of <Tex tex="X" />, and ends at 1 on the far right.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Roll a fair die
        </h2>
        <DistributionPlot
          kind="cdf-discrete"
          xLabel="x"
          yLabel="F(x)"
          data={[
            { x: 1, y: 1 / 6 },
            { x: 2, y: 2 / 6 },
            { x: 3, y: 3 / 6 },
            { x: 4, y: 4 / 6 },
            { x: 5, y: 5 / 6 },
            { x: 6, y: 1 },
          ]}
          highlightX={3}
          caption={
            <span>
              <Tex tex="F(3) = P(X \leq 3) = 3/6 = 0.5" />.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Useful identities
        </h2>
        <ul className="ml-5 list-disc space-y-1.5 text-[15px] leading-[1.75]">
          <li>
            <Tex tex="P(X > x) = 1 - F_X(x)" /> — complement of the CDF.
          </li>
          <li>
            <Tex tex="P(a < X \leq b) = F_X(b) - F_X(a)" /> — interval
            probabilities are CDF differences.
          </li>
          <li>
            <Tex tex="p_X(k) = F_X(k) - F_X(k - 1)" /> — recover the PMF as
            jump sizes.
          </li>
        </ul>
      </section>

      <Callout tone="warn" title="Strict vs non-strict inequalities">
        <p>
          For a <em>discrete</em> random variable, <Tex tex="P(X < x)" /> and{" "}
          <Tex tex="P(X \leq x)" /> can differ — the second includes the
          point mass at <Tex tex="x" />, the first doesn't. Read the
          inequality carefully and adjust if it's strict.
        </p>
      </Callout>
    </LessonShell>
  );
}
