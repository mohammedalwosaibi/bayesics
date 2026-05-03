import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { NormalCurve } from "@/components/viz/NormalCurve";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("limits", "clt");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The <strong>Central Limit Theorem</strong> explains why the normal
          distribution shows up everywhere. Sums of many independent,
          similarly-behaved random variables tend to look normal after
          centering and scaling.
        </p>
        <TexBlock tex="\frac{S_n - n\mu}{\sigma \sqrt{n}} \approx N(0,1) \qquad \text{for large } n." />
        <p>
          The original variables do <em>not</em> need to be normal. That is
          the punchline.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Example: 100 fair die rolls
        </h2>
        <p className="text-[15px] leading-[1.75]">
          For one die, <Tex tex="\mu = 3.5" /> and{" "}
          <Tex tex="\sigma^2 = 35/12" />. So the sum of 100 rolls has mean
          350 and variance <Tex tex="100 \cdot 35/12" />.
        </p>
        <NormalCurve
          mu={350}
          sigma={Math.sqrt(100 * 35 / 12)}
          shadeRange={[350 - 2 * Math.sqrt(100 * 35 / 12), 350 + 2 * Math.sqrt(100 * 35 / 12)]}
          caption={
            <span>
              By the CLT, the sum is approximately normal with center{" "}
              <Tex tex="350" /> and most of its mass clustered within a few
              standard deviations.
            </span>
          }
        />
      </section>

      <Callout tone="note" title="Average version">
        <p>
          Divide the sum by <Tex tex="n" /> and you get the sampling
          distribution of the average. Its center stays at{" "}
          <Tex tex="\mu" />, while its standard deviation shrinks like{" "}
          <Tex tex="\sigma/\sqrt{n}" />.
        </p>
      </Callout>
    </LessonShell>
  );
}
