import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("limits", "markov-inequality");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          <strong>Markov&apos;s inequality</strong> is the simplest tail bound in
          probability. If a random variable is always nonnegative, then a
          large mean is the only way it can put much mass far out in the tail.
        </p>
        <TexBlock tex="P(X \geq a) \leq \frac{E[X]}{a}, \qquad a > 0, \; X \geq 0." />
        <p>
          It is crude, but it asks for almost no information: just
          nonnegativity and the mean.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          A quick example
        </h2>
        <p className="text-[15px] leading-[1.75]">
          If <Tex tex="E[X]=4" />, then the chance of being at least 16 is at
          most one quarter:
        </p>
        <TexBlock tex="P(X \geq 16) \leq \frac{4}{16} = 0.25." />
        <p className="text-[15px] leading-[1.75]">
          The true probability might be much smaller. Markov only guarantees
          that it cannot exceed 0.25.
        </p>
      </section>

      <Callout tone="note" title="Distribution-free means conservative">
        <p>
          Because Markov works for <em>every</em> nonnegative distribution with
          the same mean, it cannot afford to be sharp very often. Its value is
          not precision. Its value is that it still says something useful when
          you know almost nothing else.
        </p>
      </Callout>
    </LessonShell>
  );
}
