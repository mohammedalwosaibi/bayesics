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
  const ctx = getLesson("joint", "conditional-dist");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>conditional distribution</strong> freezes one variable
          and reweights the remaining possibilities.
        </p>
        <TexBlock tex="p_{X \mid Y}(x \mid y) = \frac{p_{X,Y}(x,y)}{p_Y(y)}." />
        <p>
          In a table picture, you pick one row or one column, then divide by
          that row or column total so the probabilities add back up to 1.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Given the first flip was heads
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
              Conditional on <Tex tex="Y=1" />, only the highlighted row
              survives, and its total <Tex tex="1/2" /> becomes the new
              denominator.
            </span>
          }
        />
        <TexBlock tex="P(X=1 \mid Y=1) = \frac{P(X=1,Y=1)}{P(Y=1)} = \frac{1/4}{1/2} = 1/2." />
        <p className="text-[15px] leading-[1.75]">
          Once you know the first flip was heads, the second flip decides
          whether <Tex tex="X" /> ends up at 1 or 2. Those two outcomes are
          equally likely.
        </p>
      </section>

      <Callout tone="note" title="Conditioning = renormalizing">
        <p>
          Nothing mystical happens. You keep the probabilities compatible with
          the information you learned, throw away the impossible cells, then
          rescale what remains to total 1.
        </p>
      </Callout>
    </LessonShell>
  );
}
