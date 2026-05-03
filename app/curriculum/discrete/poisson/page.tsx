import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { DistributionPlot } from "@/components/viz/DistributionPlot";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

function poissonPmf(lambda: number, kmax: number) {
  const out: { x: number; y: number }[] = [];
  let pmf = Math.exp(-lambda);
  for (let k = 0; k <= kmax; k++) {
    out.push({ x: k, y: pmf });
    pmf = (pmf * lambda) / (k + 1);
  }
  return out;
}

export default function Page() {
  const ctx = getLesson("discrete", "poisson");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The <strong>Poisson</strong> distribution counts the number of rare
          events that happen in a fixed window of time, distance, or area.{" "}
          <Tex tex="X \sim \mathrm{Poisson}(\lambda)" /> with
        </p>
        <TexBlock tex="P(X = k) = \frac{e^{-\lambda} \, \lambda^k}{k!}, \quad k = 0, 1, 2, \dots" />
        <p>
          The single parameter <Tex tex="\lambda" /> ("lambda") is the
          expected count per window — both the mean and the variance.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Calls per minute, <Tex tex="\lambda = 2" />
        </h2>
        <DistributionPlot
          kind="pmf"
          data={poissonPmf(2, 10)}
          highlightX={0}
          xLabel="calls in a minute"
          yLabel="P(X = k)"
          caption={
            <span>
              Most minutes have 1 or 2 calls, but{" "}
              <Tex tex="P(X = 0) = e^{-2} \approx 0.135" />.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Mean and variance
        </h2>
        <TexBlock tex="E[X] = \lambda, \qquad \mathrm{Var}(X) = \lambda." />
      </section>

      <Callout tone="note" title="Where does Poisson come from?">
        <p>
          It's the limit of the binomial when <Tex tex="n" /> is large and{" "}
          <Tex tex="p" /> is small with{" "}
          <Tex tex="np = \lambda" /> fixed. Concretely: split a minute into
          tiny slots, treat each as an independent Bernoulli with a small
          chance of a call, and as the slots get fine enough you recover the
          Poisson formula. That's why it models "rare events."
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Scaling the window
        </h2>
        <p className="text-[15px] leading-[1.75]">
          If events occur at rate <Tex tex="\lambda" /> per unit time, the
          number in a window of length <Tex tex="t" /> is{" "}
          <Tex tex="\mathrm{Poisson}(\lambda t)" />. Double the window,
          double the expected count.
        </p>
      </section>
    </LessonShell>
  );
}
