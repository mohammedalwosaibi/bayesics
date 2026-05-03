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

function binomPmf(n: number, p: number) {
  return Array.from({ length: n + 1 }, (_, k) => ({
    x: k,
    y: binomCoeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k),
  }));
}

export default function Page() {
  const ctx = getLesson("discrete", "binomial");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Run <Tex tex="n" /> independent Bernoulli trials with success
          probability <Tex tex="p" /> each. Let <Tex tex="X" /> count the
          number of successes. Then{" "}
          <Tex tex="X \sim \mathrm{Binomial}(n, p)" /> with
        </p>
        <TexBlock tex="P(X = k) = \binom{n}{k} p^k (1 - p)^{n - k}, \quad k = 0, 1, \dots, n." />
        <p>
          Reading the formula: <Tex tex="\binom{n}{k}" /> ways to choose
          which <Tex tex="k" /> of the <Tex tex="n" /> trials succeed, each
          succeeding with probability <Tex tex="p" /> and the others failing
          with probability <Tex tex="1 - p" />.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Free throws: <Tex tex="n = 5" />, <Tex tex="p = 0.8" />
        </h2>
        <DistributionPlot
          kind="pmf"
          data={binomPmf(5, 0.8)}
          highlightX={4}
          xLabel="successes"
          yLabel="P(X = k)"
          caption={
            <span>
              <Tex tex="P(X = 4) = \binom{5}{4} (0.8)^4 (0.2) = 0.4096" />.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Mean and variance
        </h2>
        <TexBlock tex="E[X] = np, \qquad \mathrm{Var}(X) = np(1-p)." />
        <p className="text-[15px] leading-[1.75]">
          Both follow from linearity:{" "}
          <Tex tex="X = X_1 + \cdots + X_n" /> is a sum of{" "}
          <Tex tex="n" /> independent Bernoulli's, so means and variances
          both add.
        </p>
      </section>

      <Callout tone="note" title="Three-way interpretation">
        <p>
          <Tex tex="\mathrm{Binomial}(n, p)" /> is the same animal whether
          you describe it as "<em>n</em> coin flips," "<em>n</em>{" "}
          independent Bernoulli's summed," or "the count of successes in a
          fixed-size SRS with replacement." All three are useful — pick the
          framing that matches the problem.
        </p>
      </Callout>
    </LessonShell>
  );
}
