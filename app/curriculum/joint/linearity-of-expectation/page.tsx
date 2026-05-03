import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("joint", "linearity-of-expectation");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Expectation behaves beautifully with addition:
        </p>
        <TexBlock tex="E[X + Y] = E[X] + E[Y]." />
        <p>
          This is true whether <Tex tex="X" /> and <Tex tex="Y" /> are
          independent, positively related, negatively related, or tangled up
          in some complicated way. Expectation only cares about averaging, not
          about dependence structure.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Counting heads the easy way
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Let <Tex tex="I_1" /> be 1 if the first coin is heads and 0
          otherwise. Define <Tex tex="I_2" /> similarly for the second coin.
          Then the total number of heads is <Tex tex="H = I_1 + I_2" />.
        </p>
        <TexBlock tex="E[H] = E[I_1] + E[I_2] = \tfrac12 + \tfrac12 = 1." />
        <p className="text-[15px] leading-[1.75]">
          No need to build the full PMF of <Tex tex="H" /> first. Sometimes
          the quickest route to an answer is to split a complicated count into
          simple indicator pieces and add their expectations.
        </p>
      </section>

      <Callout tone="note" title="Indicator trick">
        <p>
          If a random count can be written as{" "}
          <Tex tex="X = I_1 + \cdots + I_n" />, then{" "}
          <Tex tex="E[X] = E[I_1] + \cdots + E[I_n]" />. This is the workhorse
          behind expected numbers of matches, collisions, fixed points, and
          many combinatorics problems.
        </p>
      </Callout>
    </LessonShell>
  );
}
