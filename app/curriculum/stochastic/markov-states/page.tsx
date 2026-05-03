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
  const ctx = getLesson("stochastic", "markov-states");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>Markov chain</strong> moves between states over time. Its
          defining property is memorylessness:
        </p>
        <TexBlock tex="P(X_{n+1}=j \mid X_n, X_{n-1}, \dots, X_0)=P(X_{n+1}=j \mid X_n)." />
        <p>
          The next step depends only on the present state, not on the full
          path that got you there.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Weather as a two-state chain
        </h2>
        <TransitionDiagram
          states={weatherStates}
          edges={weatherEdges}
          caption="Each outgoing probability from a state sums to 1."
        />
        <p className="text-[15px] leading-[1.75]">
          If today is Sunny, tomorrow is Sunny with probability 0.8 and Rainy
          with probability 0.2. That is all the chain needs for its next move.
        </p>
      </section>

      <Callout tone="note" title="State = enough information">
        <p>
          Choosing the right state description is the art. If the current
          state really captures all relevant history, the process becomes easy
          to analyze with transition rules.
        </p>
      </Callout>
    </LessonShell>
  );
}
