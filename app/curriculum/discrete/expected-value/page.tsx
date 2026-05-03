import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("discrete", "expected-value");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The <strong>expected value</strong> of a discrete random variable
          is the long-run average — what you'd get if you ran the experiment
          many times and averaged the outcomes:
        </p>
        <TexBlock tex="E[X] = \sum_k k \cdot p_X(k)." />
        <p>
          It's a <em>weighted</em> average: each value <Tex tex="k" /> is
          weighted by the chance of seeing it.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Fair die
        </h2>
        <TexBlock tex="E[X] = \frac{1 + 2 + 3 + 4 + 5 + 6}{6} = 3.5." />
        <p className="text-[15px] leading-[1.75]">
          Notice 3.5 isn't a value the die can show — that's fine. The
          expected value lives in the average, not in any single outcome.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Linearity
        </h2>
        <TexBlock tex="E[aX + b] = a \, E[X] + b, \quad E[X + Y] = E[X] + E[Y]." />
        <p className="text-[15px] leading-[1.75]">
          The second identity holds <strong>even when <Tex tex="X" /> and{" "}
          <Tex tex="Y" /> are dependent</strong>. Linearity is the workhorse
          you'll use over and over — it cracks problems where direct
          calculation is hopeless.
        </p>
      </section>

      <Callout tone="note" title="Expectation of a function">
        <p>
          For any function <Tex tex="g" />,{" "}
          <Tex tex="E[g(X)] = \sum_k g(k) \cdot p_X(k)" />. So{" "}
          <Tex tex="E[X^2] = \sum_k k^2 \, p_X(k)" />. We'll use this in the
          variance formula next lesson.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          A bet's expected return
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Pay $1 to spin a wheel. With probability <Tex tex="0.4" /> you win
          $2; with probability <Tex tex="0.6" /> you lose your dollar. Net
          payoff <Tex tex="X" /> is <Tex tex="+1" /> or <Tex tex="-1" />:
        </p>
        <TexBlock tex="E[X] = 0.4 \cdot 1 + 0.6 \cdot (-1) = -0.2." />
        <p className="text-[15px] leading-[1.75]">
          You lose 20¢ per play on average. Don't take the bet.
        </p>
      </section>
    </LessonShell>
  );
}
