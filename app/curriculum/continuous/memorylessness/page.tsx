import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("continuous", "memorylessness");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The exponential is the <em>only</em> continuous distribution with
          the <strong>memoryless property</strong>:
        </p>
        <TexBlock tex="P(X > s + t \mid X > s) = P(X > t)." />
        <p>
          Translation: given that the bus hasn't arrived after 5 minutes, the
          chance you have to wait at least 10 more is identical to the chance
          you'd wait 10 minutes from a fresh start. The clock effectively
          resets.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Why it works
        </h2>
        <TexBlock tex="P(X > s + t \mid X > s) = \frac{P(X > s + t)}{P(X > s)} = \frac{e^{-\lambda(s + t)}}{e^{-\lambda s}} = e^{-\lambda t} = P(X > t)." />
        <p className="text-[15px] leading-[1.75]">
          The exponential's tail factors: the past <Tex tex="s" /> cancels
          out cleanly.
        </p>
      </section>

      <Callout tone="warn" title="What memorylessness is NOT">
        <p>
          It does <em>not</em> say "the longer you've waited, the sooner the
          bus arrives." It says the opposite: time spent waiting gives you
          zero useful information about how much longer you'll wait. Buses
          you've already missed don't owe you anything.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Discrete cousin: Geometric
        </h2>
        <p className="text-[15px] leading-[1.75]">
          The <strong>geometric</strong> distribution is the unique discrete
          distribution with this property. If a coin hasn't come up heads in
          the first 5 flips, the chance you'll need at least 3 more is the
          same as the chance the very first run takes at least 3 — coins
          have no memory.
        </p>
        <p className="text-[15px] leading-[1.75]">
          Memorylessness is essentially the defining feature of "rates with
          no aging" — perfect for radioactive decay, hopeless for
          mechanical wear.
        </p>
      </section>
    </LessonShell>
  );
}
