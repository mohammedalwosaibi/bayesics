import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { ContingencyTable } from "@/components/viz/ContingencyTable";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

const jointTable = [
  [0.25, 0.25, 0],
  [0, 0.25, 0.25],
];

export default function Page() {
  const ctx = getLesson("joint", "conditional-expectation");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          <strong>Conditional expectation</strong> is the average value of one
          variable after you learn something about another:
        </p>
        <TexBlock tex="E[X \mid Y=y] = \sum_x x\,p_{X \mid Y}(x \mid y)" />
        <p>
          It is just an ordinary expected value, but computed under a
          conditional distribution instead of the original one.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Average heads, once the first flip is fixed
        </h2>
        <ContingencyTable
          rowLabel={<Tex tex="Y" />}
          colLabel={<Tex tex="X" />}
          rowHeaders={[<Tex key="0" tex="0" />, <Tex key="1" tex="1" />]}
          colHeaders={[
            <Tex key="0" tex="0" />,
            <Tex key="1" tex="1" />,
            <Tex key="2" tex="2" />,
          ]}
          values={jointTable}
          emphasizeRows={[1]}
          caption={
            <span>
              Given <Tex tex="Y=1" />, the conditional distribution of{" "}
              <Tex tex="X" /> is split evenly between 1 and 2.
            </span>
          }
        />
        <TexBlock tex="E[X \mid Y=1] = 1\cdot \tfrac12 + 2\cdot \tfrac12 = \tfrac32." />
        <p className="text-[15px] leading-[1.75]">
          Learning that the first flip was heads pushes the expected total
          number of heads up from 1 to 1.5.
        </p>
      </section>

      <Callout tone="note" title="Condition, then average">
        <p>
          In the lesson question, the same idea appears as{" "}
          <Tex tex="E[S \mid X_1=4] = 4 + E[X_2]" />. Once part of the random
          outcome becomes known, treat that part as fixed and average only over
          what is still uncertain.
        </p>
      </Callout>
    </LessonShell>
  );
}
