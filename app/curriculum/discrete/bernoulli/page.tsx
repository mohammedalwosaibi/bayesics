import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { DistributionPlot } from "@/components/viz/DistributionPlot";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("discrete", "bernoulli");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The simplest non-trivial random variable: a single yes/no trial.{" "}
          <Tex tex="X \sim \mathrm{Bernoulli}(p)" /> takes the value{" "}
          <Tex tex="1" /> ("success") with probability <Tex tex="p" /> and{" "}
          <Tex tex="0" /> ("failure") with probability <Tex tex="1 - p" />.
        </p>
        <TexBlock tex="p_X(1) = p, \quad p_X(0) = 1 - p." />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Mean and variance
        </h2>
        <TexBlock tex="E[X] = p, \qquad \mathrm{Var}(X) = p(1 - p)." />
        <p className="text-[15px] leading-[1.75]">
          The variance is largest at <Tex tex="p = 0.5" /> (the most
          uncertain coin) and zero at the extremes <Tex tex="p = 0" /> or{" "}
          <Tex tex="p = 1" /> (where the outcome is certain).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Visual: <Tex tex="p = 0.3" />
        </h2>
        <DistributionPlot
          kind="pmf"
          data={[
            { x: 0, y: 0.7 },
            { x: 1, y: 0.3 },
          ]}
          highlightX={1}
          xLabel="x"
          yLabel="P(X = x)"
        />
      </section>

      <Callout tone="note" title="Building block">
        <p>
          Bernoulli is the atom of discrete probability. Every distribution
          you'll meet next — Binomial, Geometric, Negative Binomial — is
          built out of independent Bernoulli trials.
        </p>
      </Callout>
    </LessonShell>
  );
}
