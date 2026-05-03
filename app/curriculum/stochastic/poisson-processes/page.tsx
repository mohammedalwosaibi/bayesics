import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { TransitionDiagram } from "@/components/viz/TransitionDiagram";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

const countStates = [
  { id: "0", label: "0", x: 80, y: 120 },
  { id: "1", label: "1", x: 190, y: 120 },
  { id: "2", label: "2", x: 300, y: 120 },
];

const countEdges = [
  { from: "0", to: "0", prob: "1-\u03bb\u0394t" },
  { from: "0", to: "1", prob: "\u03bb\u0394t", bend: -22 },
  { from: "1", to: "1", prob: "1-\u03bb\u0394t" },
  { from: "1", to: "2", prob: "\u03bb\u0394t", bend: -22 },
  { from: "2", to: "2", prob: "1-\u03bb\u0394t" },
];

export default function Page() {
  const ctx = getLesson("stochastic", "poisson-processes");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>Poisson process</strong> models random arrivals over
          continuous time: calls to a help desk, radioactive decays, or cars
          passing a sensor.
        </p>
        <TexBlock tex="N(t) \sim \mathrm{Poisson}(\lambda t), \qquad P(N(t)=k)=e^{-\lambda t}\frac{(\lambda t)^k}{k!}." />
        <p>
          The parameter <Tex tex="\lambda" /> is a rate: expected arrivals per
          unit time.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Small-interval picture
        </h2>
        <TransitionDiagram
          states={countStates}
          edges={countEdges}
          caption="Over a tiny interval Δt, the process usually stays put and occasionally jumps up by one arrival."
          width={380}
          height={220}
        />
        <p className="text-[15px] leading-[1.75]">
          Over a very short interval <Tex tex="\Delta t" />, the chance of one
          arrival is about <Tex tex="\lambda \Delta t" />, while the chance of
          two or more arrivals is negligible. That local rule generates the
          full Poisson count model.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Counts and waiting times
        </h2>
        <TexBlock tex="\text{Interarrival time} \sim \mathrm{Exponential}(\lambda)." />
        <p className="text-[15px] leading-[1.75]">
          Counts in windows are Poisson; gaps between arrivals are
          exponential. Those are two views of the same process.
        </p>
      </section>

      <Callout tone="note" title="Independent increments">
        <p>
          Disjoint time intervals behave independently. What happened this
          morning does not change the distribution of how many arrivals come
          this afternoon, as long as the rate <Tex tex="\lambda" /> stays
          fixed.
        </p>
      </Callout>
    </LessonShell>
  );
}
