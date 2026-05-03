import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { DistributionPlot } from "@/components/viz/DistributionPlot";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("continuous", "exponential");
  if (!ctx) notFound();
  const data = Array.from({ length: 80 }, (_, i) => {
    const x = i * 0.1;
    return { x, y: Math.exp(-x) };
  });
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The <strong>exponential</strong> distribution models the waiting
          time until a memoryless event — like the next radioactive decay,
          the next call to a hotline, or the next bus on a high-frequency
          route.
        </p>
        <TexBlock tex="f_X(x) = \lambda e^{-\lambda x}, \quad x \geq 0." />
        <p>
          The single parameter <Tex tex="\lambda > 0" /> is the rate: events
          per unit time. The mean waiting time is <Tex tex="1/\lambda" />.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Density and tail
        </h2>
        <DistributionPlot
          kind="pdf"
          xLabel="x"
          yLabel="f(x)"
          data={data}
          shadeRange={[1, 8]}
          caption={
            <span>
              <Tex tex="\lambda = 1" />: shaded area is{" "}
              <Tex tex="P(X > 1) = e^{-1} \approx 0.368" />.
            </span>
          }
        />
        <TexBlock tex="P(X > t) = e^{-\lambda t}, \qquad F_X(x) = 1 - e^{-\lambda x}." />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Mean and variance
        </h2>
        <TexBlock tex="E[X] = \tfrac{1}{\lambda}, \qquad \mathrm{Var}(X) = \tfrac{1}{\lambda^2}." />
        <p className="text-[15px] leading-[1.75]">
          The standard deviation equals the mean — exponential waits are
          highly variable.
        </p>
      </section>

      <Callout tone="note" title="Connection to Poisson">
        <p>
          If events occur as a Poisson process at rate <Tex tex="\lambda" />,
          the time <em>between</em> consecutive events is{" "}
          <Tex tex="\mathrm{Exponential}(\lambda)" />. Counts and inter-event
          times are two faces of the same coin.
        </p>
      </Callout>
    </LessonShell>
  );
}
