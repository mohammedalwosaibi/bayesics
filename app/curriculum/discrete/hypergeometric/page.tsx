import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { DistributionPlot } from "@/components/viz/DistributionPlot";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

function binomCoeff(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - i + 1)) / i;
  return r;
}

function hyperPmf(N: number, K: number, n: number) {
  const denom = binomCoeff(N, n);
  const lo = Math.max(0, n - (N - K));
  const hi = Math.min(n, K);
  const out: { x: number; y: number }[] = [];
  for (let k = lo; k <= hi; k++) {
    out.push({
      x: k,
      y: (binomCoeff(K, k) * binomCoeff(N - K, n - k)) / denom,
    });
  }
  return out;
}

export default function Page() {
  const ctx = getLesson("discrete", "hypergeometric");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Take a population of <Tex tex="N" /> items, of which{" "}
          <Tex tex="K" /> are "successes." Draw <Tex tex="n" /> items{" "}
          <strong>without replacement</strong>. The count <Tex tex="X" /> of
          successes in the sample is <strong>hypergeometric</strong>:
        </p>
        <TexBlock tex="P(X = k) = \frac{\binom{K}{k} \binom{N - K}{n - k}}{\binom{N}{n}}." />
        <p>
          Numerator: choose <Tex tex="k" /> successes from{" "}
          <Tex tex="K" /> available, plus <Tex tex="n - k" /> failures from
          the other <Tex tex="N - K" />. Denominator: total ways to choose{" "}
          <Tex tex="n" />.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          5 red, 5 blue, draw 3
        </h2>
        <DistributionPlot
          kind="pmf"
          data={hyperPmf(10, 5, 3)}
          highlightX={2}
          xLabel="red balls drawn"
          yLabel="P(X = k)"
          caption={
            <span>
              <Tex tex="P(X = 2) = \binom{5}{2}\binom{5}{1}/\binom{10}{3} = 5/12 \approx 0.417" />.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Mean and variance
        </h2>
        <TexBlock tex="E[X] = n \cdot \frac{K}{N}, \qquad \mathrm{Var}(X) = n \cdot \frac{K}{N} \cdot \frac{N - K}{N} \cdot \frac{N - n}{N - 1}." />
        <p className="text-[15px] leading-[1.75]">
          The first three factors look like a binomial:{" "}
          <Tex tex="np(1-p)" /> with <Tex tex="p = K/N" />. The extra factor{" "}
          <Tex tex="(N - n)/(N - 1)" /> is the <strong>finite-population
          correction</strong>: drawing without replacement reduces variance
          (the more you draw, the more you've "used up" the population).
        </p>
      </section>

      <Callout tone="note" title="With replacement vs. without">
        <p>
          Same population, but drawing <em>with</em> replacement gives a{" "}
          <Tex tex="\mathrm{Binomial}(n, K/N)" /> instead. For{" "}
          <Tex tex="N \gg n" />, the two distributions are nearly the same —
          which is why polls of the U.S. population can usually be modeled
          as binomial without much error.
        </p>
      </Callout>
    </LessonShell>
  );
}
