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
  const ctx = getLesson("joint", "marginal");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>marginal distribution</strong> is what you get after
          ignoring one variable. In a joint table, you <em>sum it out</em>.
        </p>
        <TexBlock tex="p_Y(y) = \sum_x p_{X,Y}(x,y), \qquad p_X(x) = \sum_y p_{X,Y}(x,y)." />
        <p>
          That is why the row totals and column totals matter: they are the
          one-variable distributions hiding inside the two-variable one.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Row total = marginal
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
              The highlighted row sums to{" "}
              <Tex tex="P(Y=1)=0 + 1/4 + 1/4 = 1/2" />.
            </span>
          }
        />
        <TexBlock tex="p_Y(1) = \sum_x p_{X,Y}(x,1) = 0 + \tfrac14 + \tfrac14 = \tfrac12." />
        <p className="text-[15px] leading-[1.75]">
          In plain English: the first flip is heads half the time, no matter
          how many total heads showed up by the end.
        </p>
      </section>

      <Callout tone="note" title="Rows and columns answer different questions">
        <p>
          Row totals produce the marginal of <Tex tex="Y" />. Column totals
          produce the marginal of <Tex tex="X" />. Same table, two different
          one-dimensional stories.
        </p>
      </Callout>
    </LessonShell>
  );
}
