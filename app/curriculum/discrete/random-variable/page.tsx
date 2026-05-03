import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("discrete", "random-variable");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>random variable</strong> is a number that depends on a
          random outcome. Formally, it's a function from the sample space to
          the real line:
        </p>
        <TexBlock tex="X : \Omega \to \mathbb{R}." />
        <p>
          Don't be intimidated by the symbol. Just read it as: "for each
          possible outcome, <Tex tex="X" /> spits out a number."
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Examples
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-[15px] leading-[1.75]">
          <li>
            Roll a die — <Tex tex="X" /> = the face shown. Values{" "}
            <Tex tex="\{1, 2, 3, 4, 5, 6\}" />.
          </li>
          <li>
            Flip a coin twice — <Tex tex="X" /> = number of heads. Values{" "}
            <Tex tex="\{0, 1, 2\}" />.
          </li>
          <li>
            Pick a person at random — <Tex tex="X" /> = their height in cm. A
            real-valued random variable.
          </li>
        </ul>
      </section>

      <Callout tone="note" title="Discrete vs. continuous">
        <p>
          A <strong>discrete</strong> random variable takes values in a
          countable set — like the integers, or any finite list. A{" "}
          <strong>continuous</strong> random variable can take any value in
          an interval. This module covers the discrete case; Module 4
          handles continuous.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Events as conditions on <Tex tex="X" />
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Once we have a random variable, events become conditions on its
          value. We write
        </p>
        <TexBlock tex="\{X = 2\}, \quad \{X \leq 3\}, \quad \{1 \leq X \leq 5\}." />
        <p className="text-[15px] leading-[1.75]">
          Each is shorthand for the set of outcomes <Tex tex="\omega" /> in{" "}
          <Tex tex="\Omega" /> with <Tex tex="X(\omega)" /> in the indicated
          range. Probabilities of those events are written{" "}
          <Tex tex="P(X = 2)" />, <Tex tex="P(X \leq 3)" />, and so on.
        </p>
      </section>
    </LessonShell>
  );
}
