import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { DistributionPlot } from "@/components/viz/DistributionPlot";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("continuous", "pdf");
  if (!ctx) notFound();
  const data = Array.from({ length: 41 }, (_, i) => {
    const x = i / 40;
    return { x, y: 2 * x };
  });
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>probability density function</strong>{" "}
          <Tex tex="f_X(x)" /> is the continuous analog of a PMF. Two rules:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <Tex tex="f_X(x) \geq 0" /> for all <Tex tex="x" />.
          </li>
          <li>
            <Tex tex="\int_{-\infty}^{\infty} f_X(x) \, dx = 1" />. Total area
            under the curve is 1.
          </li>
        </ul>
        <p>
          Probabilities are areas:
        </p>
        <TexBlock tex="P(a \leq X \leq b) = \int_a^b f_X(x) \, dx." />
      </section>

      <Callout tone="warn" title="Density isn't probability">
        <p>
          <Tex tex="f_X(x)" /> can be larger than 1 — the only constraint is
          that the area under it equals 1. A peaky density has a tall, thin
          spike. It's <em>density</em>: probability per unit length. Don't
          read <Tex tex="f_X(2) = 1.5" /> as "the chance of getting 2 is
          150%."
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Worked example: <Tex tex="f(x) = 2x" />
        </h2>
        <p className="text-[15px] leading-[1.75]">
          The triangular density on <Tex tex="[0, 1]" /> with{" "}
          <Tex tex="f(x) = 2x" /> assigns more chance to bigger values:
        </p>
        <DistributionPlot
          kind="pdf"
          xLabel="x"
          yLabel="f(x)"
          data={data}
          shadeRange={[0, 0.5]}
          caption={
            <span>
              Shaded: <Tex tex="P(X \leq 1/2) = \int_0^{1/2} 2x \, dx = 1/4" />.
            </span>
          }
        />
        <p className="text-[15px] leading-[1.75]">
          Sanity check on normalization:{" "}
          <Tex tex="\int_0^1 2x \, dx = [x^2]_0^1 = 1" /> ✓.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Endpoint don't matter
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Since single points have probability zero, you can swap{" "}
          <Tex tex="\leq" /> and <Tex tex="<" /> freely:
        </p>
        <TexBlock tex="P(a \leq X \leq b) = P(a < X < b) = P(a \leq X < b) = P(a < X \leq b)." />
        <p className="text-[15px] leading-[1.75]">
          A small but liberating shift from the discrete world.
        </p>
      </section>
    </LessonShell>
  );
}
