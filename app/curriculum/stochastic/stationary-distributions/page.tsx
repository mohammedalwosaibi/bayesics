import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { TexBlock } from "@/components/Math";
import { TransitionDiagram } from "@/components/viz/TransitionDiagram";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

const weatherStates = [
  { id: "sunny", label: "Sunny", x: 120, y: 120 },
  { id: "rainy", label: "Rainy", x: 300, y: 120 },
];

const weatherEdges = [
  { from: "sunny", to: "sunny", prob: "0.8" },
  { from: "sunny", to: "rainy", prob: "0.2", bend: -28 },
  { from: "rainy", to: "sunny", prob: "0.5", bend: 28 },
  { from: "rainy", to: "rainy", prob: "0.5" },
];

export default function Page() {
  const ctx = getLesson("stochastic", "stationary-distributions");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>stationary distribution</strong> is a probability vector
          that remains unchanged after one transition:
        </p>
        <TexBlock tex="\pi P = \pi, \qquad \pi_S + \pi_R = 1." />
        <p>
          If the chain starts in that mix of states, it keeps the same mix at
          every later time step.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Balancing flow in the weather chain
        </h2>
        <TransitionDiagram
          states={weatherStates}
          edges={weatherEdges}
          caption="At stationarity, flow from Sunny to Rainy matches flow back from Rainy to Sunny."
        />
        <TexBlock tex="\pi_S \cdot 0.2 = \pi_R \cdot 0.5, \qquad \pi_S + \pi_R = 1." />
        <TexBlock tex="\pi_S = \tfrac57, \qquad \pi_R = \tfrac27." />
        <p className="text-[15px] leading-[1.75]">
          So in the long run, about 71.4% of days are Sunny and 28.6% are
          Rainy.
        </p>
      </section>

      <Callout tone="note" title="Stationary is not the same as immediate">
        <p>
          Starting from Sunny today does not mean tomorrow&apos;s distribution is
          already stationary. Stationarity describes the long-run equilibrium
          mix, not the first step.
        </p>
      </Callout>
    </LessonShell>
  );
}
