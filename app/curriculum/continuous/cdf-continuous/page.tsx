import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { DistributionPlot } from "@/components/viz/DistributionPlot";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("continuous", "cdf-continuous");
  if (!ctx) notFound();
  const data = Array.from({ length: 41 }, (_, i) => {
    const x = i / 40;
    return { x, y: x };
  });
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The CDF of a continuous random variable accumulates density from{" "}
          <Tex tex="-\infty" />:
        </p>
        <TexBlock tex="F_X(x) = P(X \leq x) = \int_{-\infty}^x f_X(t) \, dt." />
        <p>
          By the fundamental theorem of calculus, the PDF is the derivative
          of the CDF:
        </p>
        <TexBlock tex="f_X(x) = F_X'(x)." />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Properties
        </h2>
        <ul className="ml-5 list-disc space-y-1.5 text-[15px] leading-[1.75]">
          <li>
            <Tex tex="F_X" /> is non-decreasing.
          </li>
          <li>
            <Tex tex="\lim_{x \to -\infty} F_X(x) = 0" />,{" "}
            <Tex tex="\lim_{x \to \infty} F_X(x) = 1" />.
          </li>
          <li>
            For continuous variables, <Tex tex="F_X" /> is also continuous —
            no jumps.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Uniform on [0, 1]
        </h2>
        <p className="text-[15px] leading-[1.75]">
          PDF <Tex tex="f(x) = 1" /> on <Tex tex="[0, 1]" />, zero outside.
          Integrating:
        </p>
        <TexBlock tex="F_X(x) = \begin{cases} 0 & x < 0 \\ x & 0 \leq x \leq 1 \\ 1 & x > 1 \end{cases}" />
        <DistributionPlot
          kind="cdf-continuous"
          xLabel="x"
          yLabel="F(x)"
          data={data}
          caption={
            <span>
              <Tex tex="F(0.4) = 0.4" /> — read off the linear ramp.
            </span>
          }
        />
      </section>

      <Callout tone="note" title="Interval probabilities">
        <p>
          The CDF makes interval probabilities trivial:{" "}
          <Tex tex="P(a \leq X \leq b) = F_X(b) - F_X(a)" />. Same identity
          as the discrete case — no integral required.
        </p>
      </Callout>
    </LessonShell>
  );
}
