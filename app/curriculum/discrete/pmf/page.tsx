import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { DistributionPlot } from "@/components/viz/DistributionPlot";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("discrete", "pmf");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>probability mass function</strong>{" "}
          <Tex tex="p_X(k) = P(X = k)" /> tells you how the total probability
          of 1 is split across the possible values of <Tex tex="X" />. Two
          rules:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <Tex tex="p_X(k) \geq 0" /> for every <Tex tex="k" />.
          </li>
          <li>
            <Tex tex="\sum_k p_X(k) = 1" />. Probabilities have to add up.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Two coin flips
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Let <Tex tex="X" /> = number of heads in two fair flips. The four
          equally-likely outcomes <Tex tex="\{HH, HT, TH, TT\}" /> map to:
        </p>
        <TexBlock tex="p_X(0) = \tfrac{1}{4},\quad p_X(1) = \tfrac{2}{4},\quad p_X(2) = \tfrac{1}{4}." />
        <DistributionPlot
          kind="pmf"
          xLabel="number of heads"
          yLabel="probability"
          data={[
            { x: 0, y: 0.25 },
            { x: 1, y: 0.5 },
            { x: 2, y: 0.25 },
          ]}
          highlightX={1}
          caption={
            <span>
              Bar at <Tex tex="X = 1" /> highlighted: two of the four
              outcomes (HT, TH) give one head.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Probabilities of events
        </h2>
        <p className="text-[15px] leading-[1.75]">
          The probability of <em>any</em> event involving <Tex tex="X" /> is
          a sum of mass values:
        </p>
        <TexBlock tex="P(X \in A) = \sum_{k \in A} p_X(k)." />
        <p className="text-[15px] leading-[1.75]">
          For example, <Tex tex="P(X \geq 1) = p_X(1) + p_X(2) = 3/4" />.
        </p>
      </section>

      <Callout tone="note" title="The PMF is the whole story">
        <p>
          Once you know the PMF, you know everything probabilistic about{" "}
          <Tex tex="X" />: every event probability, the mean, the variance,
          the cumulative distribution. Discrete distributions are completely
          characterized by their PMF.
        </p>
      </Callout>
    </LessonShell>
  );
}
