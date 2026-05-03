import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("foundations", "combinations");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A <strong>combination</strong> is a <em>selection</em> where order
          doesn't matter. The trick to counting them: count ordered selections
          (permutations), then divide out the orderings.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          The binomial coefficient
        </h2>
        <p className="text-[15px] leading-[1.75]">
          The number of ways to choose <Tex tex="k" /> items from{" "}
          <Tex tex="n" /> distinct items, <em>order ignored</em>, is:
        </p>
        <TexBlock tex="\binom{n}{k} = \frac{n!}{k!\,(n-k)!}." />
        <p className="text-[15px] leading-[1.75]">
          Read it "<em>n</em> choose <em>k</em>." Each unordered group of{" "}
          <Tex tex="k" /> items can be arranged in <Tex tex="k!" /> orders, so
          we divide the ordered count <Tex tex="n!/(n-k)!" /> by{" "}
          <Tex tex="k!" />.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Building a committee
        </h2>
        <p className="text-[15px] leading-[1.75]">
          From <strong>10 students</strong>, choose a committee of{" "}
          <strong>3</strong> (no roles, just members):
        </p>
        <TexBlock tex="\binom{10}{3} = \frac{10!}{3!\,7!} = \frac{10 \cdot 9 \cdot 8}{3 \cdot 2 \cdot 1} = 120." />
        <p className="text-[15px] leading-[1.75]">
          Compare with the <em>roles</em> version from the previous lesson —
          we got 720 there. The factor of <Tex tex="3! = 6" /> is exactly the
          number of ways the same 3 people could be assigned the 3 roles.
        </p>
      </section>

      <Callout tone="note" title="Useful identities">
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <Tex tex="\binom{n}{0} = \binom{n}{n} = 1" />
          </li>
          <li>
            <Tex tex="\binom{n}{1} = n" />
          </li>
          <li>
            <strong>Symmetry:</strong>{" "}
            <Tex tex="\binom{n}{k} = \binom{n}{n - k}" /> — choosing who's{" "}
            <em>in</em> is the same as choosing who's <em>out</em>.
          </li>
          <li>
            <Tex tex="\sum_{k=0}^{n} \binom{n}{k} = 2^n" /> — total number of
            subsets of an <Tex tex="n" />-element set.
          </li>
        </ul>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          A poker probability
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Five cards drawn from a 52-card deck. The number of possible hands
          (order ignored):
        </p>
        <TexBlock tex="\binom{52}{5} = 2{,}598{,}960." />
        <p className="text-[15px] leading-[1.75]">
          The number of <em>flushes</em> in any one suit is{" "}
          <Tex tex="\binom{13}{5} = 1287" />. Four suits, so:
        </p>
        <TexBlock tex="P(\text{flush}) = \frac{4 \cdot 1287}{2{,}598{,}960} \approx 0.00198." />
      </section>

      <Callout tone="trap" title="Order or no order — pick one and stay there">
        <p>
          The most common counting mistake is mixing the two regimes inside
          one calculation: counting the numerator with order and the
          denominator without (or vice versa). Pick a regime up front, and
          count both numerator and denominator the same way.
        </p>
      </Callout>
    </LessonShell>
  );
}
