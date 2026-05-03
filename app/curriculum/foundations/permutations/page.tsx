import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("foundations", "permutations");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>permutation</strong> is an <em>ordering</em> — a way to
          line distinct items up. The multiplication principle gives us the
          count immediately.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Ordering all <Tex tex="n" /> items
        </h2>
        <p className="text-[15px] leading-[1.75]">
          To line up <Tex tex="n" /> distinct items: <Tex tex="n" /> choices
          for first, <Tex tex="n - 1" /> for second, ..., <Tex tex="1" /> for
          last:
        </p>
        <TexBlock tex="n! = n \cdot (n-1) \cdot (n-2) \cdots 2 \cdot 1." />
        <p className="text-[15px] leading-[1.75]">
          We say "<Tex tex="n" /> factorial." A few values to memorize:
        </p>
        <TexBlock tex="3! = 6,\quad 4! = 24,\quad 5! = 120,\quad 10! = 3{,}628{,}800." />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Ordering <Tex tex="k" /> out of <Tex tex="n" />
        </h2>
        <p className="text-[15px] leading-[1.75]">
          To pick and order <Tex tex="k" /> items from <Tex tex="n" />:
        </p>
        <TexBlock tex="P(n, k) = n \cdot (n-1) \cdots (n - k + 1) = \frac{n!}{(n - k)!}." />
        <p className="text-[15px] leading-[1.75]">
          Example: choose a president, vice-president, and secretary from 10
          people. Order matters because the roles differ:{" "}
          <Tex tex="10 \cdot 9 \cdot 8 = 720" />.
        </p>
      </section>

      <Callout tone="note" title="Convention">
        <p>
          By definition <Tex tex="0! = 1" />. There's exactly one way to
          arrange zero items: do nothing. This makes formulas like{" "}
          <Tex tex="n!/(n-k)!" /> work cleanly when <Tex tex="k = n" />.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Books on a shelf
        </h2>
        <p className="text-[15px] leading-[1.75]">
          <strong>5 distinct books</strong> on a shelf:{" "}
          <Tex tex="5! = 120" /> orderings.
        </p>
        <p className="text-[15px] leading-[1.75]">
          What if 2 of the 5 are identical copies? Now swapping the duplicates
          doesn't create a new ordering. Divide out the redundant swaps:
        </p>
        <TexBlock tex="\frac{5!}{2!} = \frac{120}{2} = 60." />
      </section>

      <Callout tone="trap" title="Order is the whole question">
        <p>
          If the question reads "how many ways to <em>arrange</em>, line up,
          rank, schedule, or assign roles" — order matters, use a permutation.
          If it reads "how many ways to <em>choose</em>, select, or pick a
          group" — order doesn't matter, you want a combination (next
          lesson).
        </p>
      </Callout>
    </LessonShell>
  );
}
