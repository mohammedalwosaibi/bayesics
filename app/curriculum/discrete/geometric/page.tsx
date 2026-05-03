import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { DistributionPlot } from "@/components/viz/DistributionPlot";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

function geomPmf(p: number, kmax: number) {
  return Array.from({ length: kmax }, (_, i) => {
    const k = i + 1;
    return { x: k, y: Math.pow(1 - p, k - 1) * p };
  });
}

export default function Page() {
  const ctx = getLesson("discrete", "geometric");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Now flip the question. Instead of fixing the number of trials and
          counting successes, fix that you want one success and count{" "}
          <em>how long it takes</em>. <Tex tex="X \sim \mathrm{Geometric}(p)" />{" "}
          counts trials until (and including) the first success:
        </p>
        <TexBlock tex="P(X = k) = (1 - p)^{k - 1} \, p, \quad k = 1, 2, 3, \dots" />
        <p>
          Read it: fail <Tex tex="k - 1" /> times, then succeed.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Fair coin
        </h2>
        <DistributionPlot
          kind="pmf"
          data={geomPmf(0.5, 8)}
          highlightX={3}
          xLabel="trial of first head"
          yLabel="P(X = k)"
          caption={
            <span>
              <Tex tex="P(X = 3) = (1/2)^2 \cdot (1/2) = 1/8 = 0.125" />.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Mean and variance
        </h2>
        <TexBlock tex="E[X] = \frac{1}{p}, \qquad \mathrm{Var}(X) = \frac{1 - p}{p^2}." />
        <p className="text-[15px] leading-[1.75]">
          A fair coin: average of 2 flips for the first head. Probability{" "}
          <Tex tex="0.1" />: average of 10. Useful gut-check: the rarer the
          success, the longer the wait.
        </p>
      </section>

      <Callout tone="warn" title="Convention check">
        <p>
          Some texts use <Tex tex="X" /> = number of <em>failures before</em>
          {" "}the first success (so <Tex tex="X = 0, 1, 2, \dots" />). That
          shifts the formulas: <Tex tex="E[X] = (1-p)/p" />, and{" "}
          <Tex tex="P(X = k) = (1-p)^k p" />. Same distribution, indexed
          differently. Always check which convention a problem uses.
        </p>
      </Callout>
    </LessonShell>
  );
}
