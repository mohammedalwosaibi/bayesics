import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { NormalCurve } from "@/components/viz/NormalCurve";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("continuous", "normal");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The <strong>normal</strong> (or Gaussian) distribution is the bell
          curve. <Tex tex="X \sim N(\mu, \sigma^2)" /> has density
        </p>
        <TexBlock tex="f_X(x) = \frac{1}{\sigma \sqrt{2\pi}} \, \exp\left(-\frac{(x - \mu)^2}{2 \sigma^2}\right)." />
        <p>
          Two parameters: <Tex tex="\mu" /> (mean, center) and{" "}
          <Tex tex="\sigma^2" /> (variance, spread).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          The 68–95–99.7 rule
        </h2>
        <p className="text-[15px] leading-[1.75]">
          For any normal:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-[15px] leading-[1.75]">
          <li>About <strong>68%</strong> of the mass is within <Tex tex="\pm 1\sigma" /> of the mean.</li>
          <li>About <strong>95%</strong> within <Tex tex="\pm 2\sigma" />.</li>
          <li>About <strong>99.7%</strong> within <Tex tex="\pm 3\sigma" />.</li>
        </ul>
        <NormalCurve
          mu={0}
          sigma={1}
          shadeRange={[-1, 1]}
          caption={
            <span>
              <Tex tex="P(-1 \leq Z \leq 1) \approx 0.683" /> for the
              standard normal <Tex tex="Z \sim N(0, 1)" />.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Why it shows up everywhere
        </h2>
        <p className="text-[15px] leading-[1.75]">
          The Central Limit Theorem (Module 6) says sums and averages of{" "}
          <em>almost any</em> sufficiently nice distribution become normal as
          you add more terms. So whenever a quantity arises as the sum of
          many small independent contributions — measurement noise, the
          height of an adult, an asset's daily return — the normal is the
          right starting point.
        </p>
      </section>

      <Callout tone="note" title="No closed-form CDF">
        <p>
          The integral{" "}
          <Tex tex="\int e^{-x^2/2} dx" /> has no elementary
          antiderivative. We get probabilities by tables, software, or the
          standardization trick we'll see next.
        </p>
      </Callout>
    </LessonShell>
  );
}
