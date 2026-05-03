import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("limits", "chebyshev");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          <strong>Chebyshev&apos;s inequality</strong> upgrades Markov by using the
          variance as well as the mean. It controls how much probability can
          live far away from the center.
        </p>
        <TexBlock tex="P(|X-\mu| \geq k\sigma) \leq \frac{1}{k^2}, \qquad k > 0." />
        <p>
          You can derive it by applying Markov to the nonnegative variable{" "}
          <Tex tex="(X-\mu)^2" />.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Two standard deviations
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Suppose <Tex tex="E[X]=10" /> and <Tex tex="\mathrm{Var}(X)=4" />.
          Then <Tex tex="\sigma=2" />, so being 4 units from the mean means
          being <Tex tex="2\sigma" /> away.
        </p>
        <TexBlock tex="P(|X-10| \geq 4) \leq \frac{1}{2^2} = 0.25." />
        <p className="text-[15px] leading-[1.75]">
          Equivalently, at least 75% of the distribution must lie within 4 of
          the mean.
        </p>
      </section>

      <Callout tone="note" title="Works far beyond the normal distribution">
        <p>
          For a normal variable, two standard deviations usually capture about
          95% of the mass. Chebyshev only guarantees 75%, but it works even
          for ugly, skewed, or multimodal distributions.
        </p>
      </Callout>
    </LessonShell>
  );
}
