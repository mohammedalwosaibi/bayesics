import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { NormalCurve } from "@/components/viz/NormalCurve";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("continuous", "standardization");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Every normal can be converted to a single reference distribution —
          the <strong>standard normal</strong> <Tex tex="Z \sim N(0, 1)" /> —
          via the <strong>Z-score</strong>:
        </p>
        <TexBlock tex="Z = \frac{X - \mu}{\sigma}." />
        <p>
          The Z-score measures "how many standard deviations <Tex tex="X" />{" "}
          is from its mean." Probabilities about <Tex tex="X" /> become
          probabilities about <Tex tex="Z" />, and you can read those off a
          table or one universal curve.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Heights example
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Adult heights are roughly <Tex tex="N(170, 10^2)" /> cm. How
          unusual is a 185 cm height?
        </p>
        <TexBlock tex="Z = \tfrac{185 - 170}{10} = 1.5." />
        <p className="text-[15px] leading-[1.75]">
          1.5 standard deviations above the mean. Looking up{" "}
          <Tex tex="P(Z \leq 1.5) \approx 0.933" />, so about 93% of the
          population is shorter — only ~7% are taller.
        </p>
        <NormalCurve
          mu={0}
          sigma={1}
          markX={1.5}
          shadeRange={[-4, 1.5]}
          caption={
            <span>
              Vertical line at <Tex tex="Z = 1.5" />. Shaded area is{" "}
              <Tex tex="P(Z \leq 1.5) \approx 0.933" />.
            </span>
          }
        />
      </section>

      <Callout tone="note" title="Why standardize?">
        <p>
          One table or one chart works for every normal — no matter the mean
          or variance. Standardization is also how computers compute normal
          probabilities, and how the CLT phrases its conclusions.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          The reverse direction
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Going the other way: if <Tex tex="Z \sim N(0, 1)" /> then{" "}
          <Tex tex="X = \mu + \sigma Z \sim N(\mu, \sigma^2)" />. Linear
          transformations of normals are normal — a fact you'll lean on
          constantly.
        </p>
      </section>
    </LessonShell>
  );
}
