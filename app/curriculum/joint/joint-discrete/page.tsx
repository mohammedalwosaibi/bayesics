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
  const ctx = getLesson("joint", "joint-discrete");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>joint distribution</strong> tells you how probability is
          spread across <em>pairs</em> of values, not just one variable at a
          time. For discrete random variables, the joint PMF is
        </p>
        <TexBlock tex="p_{X,Y}(x,y) = P(X = x, Y = y)." />
        <p>
          Every cell in the table is a fully specified event: both{" "}
          <Tex tex="X" /> and <Tex tex="Y" /> are pinned down at once.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Two coin flips, two variables
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Flip two fair coins. Let <Tex tex="X" /> be the number of heads,
          and let <Tex tex="Y = 1" /> if the <em>first</em> flip is heads,
          otherwise <Tex tex="Y = 0" />.
        </p>
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
          emphasizeCells={[[1, 1]]}
          caption={
            <span>
              The highlighted cell is{" "}
              <Tex tex="P(X=1, Y=1) = 1/4" />: exactly one head, and it
              arrived on the first flip.
            </span>
          }
        />
        <TexBlock tex="p_{X,Y}(1,1) = P(\mathrm{HT}) = \tfrac14." />
      </section>

      <Callout tone="note" title="Joint tables must total 1">
        <p>
          If you add every cell, you should get 1. That is the quickest
          sanity check that the table really is a probability model and not
          just a collection of interesting numbers.
        </p>
      </Callout>
    </LessonShell>
  );
}
