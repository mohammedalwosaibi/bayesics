import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { ContingencyTable } from "@/components/viz/ContingencyTable";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

const independentTable = [
  [0.25, 0.25],
  [0.25, 0.25],
];

export default function Page() {
  const ctx = getLesson("joint", "independence-rvs");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Two random variables are <strong>independent</strong> when knowing
          one does not change the distribution of the other.
        </p>
        <TexBlock tex="p_{X,Y}(x,y) = p_X(x)\,p_Y(y) \quad \text{for every } (x,y)." />
        <p>
          That factorization condition is stronger than checking one or two
          lucky cells. It has to work everywhere the joint distribution lives.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Two independent coin indicators
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Let <Tex tex="X" /> indicate whether coin 1 is heads and{" "}
          <Tex tex="Y" /> indicate whether coin 2 is heads.
        </p>
        <ContingencyTable
          rowLabel={<Tex tex="Y" />}
          colLabel={<Tex tex="X" />}
          rowHeaders={[<Tex key="0" tex="0" />, <Tex key="1" tex="1" />]}
          colHeaders={[<Tex key="0" tex="0" />, <Tex key="1" tex="1" />]}
          values={independentTable}
          emphasizeCells={[[1, 1]]}
          caption={
            <span>
              Every cell equals <Tex tex="1/4" />, while each marginal
              equals <Tex tex="1/2" />. So{" "}
              <Tex tex="P(X=1,Y=1)=P(X=1)P(Y=1)" />.
            </span>
          }
        />
        <TexBlock tex="P(X=1,Y=1)=\tfrac14=\tfrac12 \cdot \tfrac12." />
      </section>

      <Callout tone="trap" title="Zero covariance is weaker">
        <p>
          Later you will meet pairs with zero covariance that are still
          dependent. Independence is the full factorization of the joint, not
          just one summary statistic coming out to zero.
        </p>
      </Callout>
    </LessonShell>
  );
}
