import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("joint", "correlation");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Covariance depends on units. If you measure height in centimeters
          instead of meters, the covariance changes.{" "}
          <strong>Correlation</strong> fixes that by scaling covariance into a
          unit-free number:
        </p>
        <TexBlock tex="\mathrm{Corr}(X,Y)=\frac{\mathrm{Cov}(X,Y)}{\sigma_X \sigma_Y}." />
        <p>
          The result always lies between <Tex tex="-1" /> and{" "}
          <Tex tex="1" />.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Perfect positive linear relationship
        </h2>
        <p className="text-[15px] leading-[1.75]">
          If <Tex tex="Y = 2X + 3" />, then knowing <Tex tex="X" /> pins down{" "}
          <Tex tex="Y" /> exactly, and the relationship slopes upward.
        </p>
        <TexBlock tex="\mathrm{Corr}(X,2X+3)=1 \qquad \text{whenever } \mathrm{Var}(X)>0." />
        <p className="text-[15px] leading-[1.75]">
          The multiplier 2 stretches the scale, and the +3 shifts the center,
          but neither breaks the perfect linear alignment.
        </p>
      </section>

      <Callout tone="note" title="What the extremes mean">
        <p>
          Correlation <Tex tex="1" /> means all points lie on an upward line.
          Correlation <Tex tex="-1" /> means all points lie on a downward
          line. Correlation near 0 means there is little linear signal, though
          nonlinear dependence may still be present.
        </p>
      </Callout>
    </LessonShell>
  );
}
