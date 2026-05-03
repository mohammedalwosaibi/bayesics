import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { DiceHistogram } from "@/components/drills/DiceHistogram";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("limits", "wlln");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The <strong>Weak Law of Large Numbers</strong> says sample averages
          stabilize. As you average more independent observations, the result
          gets closer and closer to the true mean in probability.
        </p>
        <TexBlock tex="\overline{X}_n = \frac{X_1 + \cdots + X_n}{n} \xrightarrow{P} \mu." />
        <p>
          In practical terms: randomness does not disappear, but averaging
          makes it less wild.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Watch the average settle
        </h2>
        <p className="text-[15px] leading-[1.75]">
          This simulator rolls two dice repeatedly. The running average of the
          sum should drift toward <Tex tex="E[X]=7" /> as more rolls
          accumulate.
        </p>
        <DiceHistogram />
      </section>

      <Callout tone="note" title="Converges in probability">
        <p>
          The law does <em>not</em> say every finite prefix looks calm. It says
          that for any tolerance band you choose, the chance the sample mean
          falls outside that band goes to 0 as the sample size grows.
        </p>
      </Callout>
    </LessonShell>
  );
}
