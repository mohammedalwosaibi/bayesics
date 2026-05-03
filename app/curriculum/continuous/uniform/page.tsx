import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { DistributionPlot } from "@/components/viz/DistributionPlot";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("continuous", "uniform");
  if (!ctx) notFound();
  // Uniform(2, 8) PDF, with a small "shoulder" on each side for context.
  const data: { x: number; y: number }[] = [];
  for (let i = 0; i <= 80; i++) {
    const x = i / 8;
    const y = x >= 2 && x <= 8 ? 1 / 6 : 0;
    data.push({ x, y });
  }
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The <strong>continuous uniform</strong> distribution puts equal
          density on every value in an interval <Tex tex="[a, b]" />:
        </p>
        <TexBlock tex="f_X(x) = \begin{cases} \tfrac{1}{b - a} & a \leq x \leq b \\ 0 & \text{otherwise} \end{cases}" />
        <p>
          The density height is <Tex tex="1/(b - a)" /> — whatever it takes
          to make the area equal 1.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          <Tex tex="\mathrm{Uniform}(2, 8)" />
        </h2>
        <DistributionPlot
          kind="pdf"
          xLabel="x"
          yLabel="f(x)"
          data={data}
          shadeRange={[3, 5]}
          caption={
            <span>
              Shaded: <Tex tex="P(3 \leq X \leq 5) = 2/6 = 1/3" />.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Mean, variance, CDF
        </h2>
        <TexBlock tex="E[X] = \tfrac{a + b}{2}, \quad \mathrm{Var}(X) = \tfrac{(b - a)^2}{12}, \quad F_X(x) = \tfrac{x - a}{b - a} \text{ on } [a, b]." />
      </section>

      <Callout tone="note" title="Where it shows up">
        <p>
          A continuous uniform model is the right starting point whenever
          symmetry says no point in an interval is privileged: random angles
          on a clock face, idealized arrival times within a window, or
          quantization noise from rounding.
        </p>
      </Callout>
    </LessonShell>
  );
}
