import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("continuous", "expectation-continuous");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Discrete expectation summed values weighted by probabilities.
          Continuous expectation does the same — with an integral:
        </p>
        <TexBlock tex="E[X] = \int_{-\infty}^{\infty} x \, f_X(x) \, dx." />
        <p>
          More generally, for any function <Tex tex="g" />:
        </p>
        <TexBlock tex="E[g(X)] = \int_{-\infty}^{\infty} g(x) \, f_X(x) \, dx." />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Uniform on [0, 1]
        </h2>
        <TexBlock tex="E[X] = \int_0^1 x \cdot 1 \, dx = \tfrac{1}{2}." />
        <p className="text-[15px] leading-[1.75]">
          The center of mass of a uniform density is the midpoint.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Skewed example: <Tex tex="f(x) = 2x" /> on <Tex tex="[0, 1]" />
        </h2>
        <TexBlock tex="E[X] = \int_0^1 x \cdot 2x \, dx = \int_0^1 2x^2 \, dx = \tfrac{2}{3}." />
        <p className="text-[15px] leading-[1.75]">
          Density grows toward 1, so the average is pulled to the right of
          the midpoint — exactly what you'd eyeball.
        </p>
      </section>

      <Callout tone="note" title="Linearity carries over">
        <p>
          <Tex tex="E[aX + b] = a E[X] + b" /> and{" "}
          <Tex tex="E[X + Y] = E[X] + E[Y]" />. Same rules as discrete; same
          proof via the integral.
        </p>
      </Callout>
    </LessonShell>
  );
}
