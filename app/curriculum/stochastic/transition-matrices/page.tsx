import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
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
  const ctx = getLesson("stochastic", "transition-matrices");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>transition matrix</strong> stores every one-step move in a
          single object. For the Sunny/Rainy chain:
        </p>
        <TexBlock tex="P = \begin{bmatrix} 0.8 & 0.2 \\ 0.5 & 0.5 \end{bmatrix}" />
        <p>
          Each row corresponds to the current state, and each row must sum to
          1 because something has to happen next.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Two-step probabilities
        </h2>
        <TransitionDiagram
          states={weatherStates}
          edges={weatherEdges}
          caption="To get two-step probabilities, combine paths of length 2."
        />
        <TexBlock tex="P^2_{SS} = 0.8 \cdot 0.8 + 0.2 \cdot 0.5 = 0.74." />
        <p className="text-[15px] leading-[1.75]">
          From Sunny today, there are two ways to be Sunny two days from now:
          stay Sunny twice, or go Sunny then bounce back from Rainy.
        </p>
      </section>

      <Callout tone="note" title="Matrix powers track time">
        <p>
          The entry <Tex tex="(i,j)" /> of <Tex tex="P^n" /> is the probability
          of being in state <Tex tex="j" /> after <Tex tex="n" /> steps when
          you start in state <Tex tex="i" />.
        </p>
      </Callout>
    </LessonShell>
  );
}
