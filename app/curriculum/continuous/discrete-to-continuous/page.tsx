import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("continuous", "discrete-to-continuous");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          So far every random variable has had a <em>countable</em> set of
          possible values — die faces, head counts, arrival counts.
          Continuous random variables can take any value in an interval. A
          person's height. The exact time you wait for a bus. A noise voltage.
        </p>
        <p>
          The first thing that breaks: <em>individual outcomes have
          probability zero</em>.
        </p>
        <TexBlock tex="P(X = c) = 0 \quad \text{for any specific } c." />
      </section>

      <Callout tone="warn" title="Why zero?">
        <p>
          If you sliced the height range into 10,000 equally likely buckets,
          each bucket would have probability <Tex tex="1/10{,}000" />. Make
          the buckets finer — millimeters, micrometers, atoms — and the
          per-bucket probability shrinks toward zero. In the limit, any{" "}
          <em>exact</em> value gets probability zero. Probability lives in{" "}
          <em>intervals</em>, not in points.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          From bars to a curve
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Picture a histogram of heights with bin width <Tex tex="\Delta" />.
          Each bar's height is{" "}
          <Tex tex="P(X \in \text{bin}) / \Delta" /> — a probability{" "}
          <em>density</em>. As <Tex tex="\Delta \to 0" /> the bars merge
          into a smooth curve, the <strong>probability density function</strong>
          {" "}<Tex tex="f_X(x)" />.
        </p>
        <p className="text-[15px] leading-[1.75]">
          The probability of an interval is the area under the curve:
        </p>
        <TexBlock tex="P(a \leq X \leq b) = \int_a^b f_X(x) \, dx." />
      </section>

      <Callout tone="note" title="Key shifts">
        <ul className="ml-5 list-disc space-y-1">
          <li>PMF → PDF (mass → density)</li>
          <li>Sum → integral</li>
          <li>Probability at a point → probability over an interval</li>
        </ul>
      </Callout>
    </LessonShell>
  );
}
