import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { VennDiagram } from "@/components/viz/VennDiagram";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("foundations", "inclusion-exclusion");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          When events overlap, you can&rsquo;t just add their probabilities —
          the overlap gets counted twice. <strong>Inclusion–exclusion</strong>
          {" "}fixes the overcount by subtracting the intersection back out.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Two events
        </h2>
        <TexBlock tex="P(A \cup B) = P(A) + P(B) - P(A \cap B)." />
        <VennDiagram
          shaded="AuB"
          labels={{ A: "A", B: "B" }}
          caption={
            <span>
              Adding <Tex tex="P(A)" /> and <Tex tex="P(B)" /> double-counts
              the overlap. Subtract <Tex tex="P(A \cap B)" /> once to
              correct.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Worked example: divisible by 2 or 5
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Pick a number uniformly from 1 to 100. Let <Tex tex="A" /> = "
          divisible by 2" and <Tex tex="B" /> = "divisible by 5." Count the
          three pieces:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-[15px] leading-[1.75]">
          <li>
            <Tex tex="|A| = 50" /> (the even numbers)
          </li>
          <li>
            <Tex tex="|B| = 20" /> (multiples of 5)
          </li>
          <li>
            <Tex tex="|A \cap B| = 10" /> (multiples of 10)
          </li>
        </ul>
        <TexBlock tex="P(A \cup B) = \tfrac{50 + 20 - 10}{100} = \tfrac{60}{100} = 0.6." />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Three events
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Pattern: add singles, subtract doubles, add the triple back in.
        </p>
        <TexBlock tex="P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)." />
      </section>

      <Callout tone="note" title="The general formula">
        <p>
          For <Tex tex="n" /> events, alternate signs:
        </p>
        <p className="mt-2">
          <Tex tex="P\left(\bigcup_{i=1}^n A_i\right) = \sum_i P(A_i) - \sum_{i<j} P(A_i \cap A_j) + \sum_{i<j<k} P(A_i \cap A_j \cap A_k) - \cdots" />
        </p>
        <p className="mt-2">
          The <Tex tex="k" />-fold intersections come in with sign{" "}
          <Tex tex="(-1)^{k+1}" />.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Complement is often easier
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Computing "at least one of these events happens" is often cleaner
          via the complement:
        </p>
        <TexBlock tex="P(A_1 \cup \cdots \cup A_n) = 1 - P(A_1^c \cap \cdots \cap A_n^c)." />
        <p className="text-[15px] leading-[1.75]">
          For independent events <Tex tex="A_i" />, the right-hand side
          factors into a product — much faster than the alternating sum.
        </p>
      </section>

      <Callout tone="trap" title="Don't forget the overlap">
        <p>
          The single most common error in introductory probability:{" "}
          <Tex tex="P(A \cup B) = P(A) + P(B)" />. That's only valid when{" "}
          <Tex tex="A" /> and <Tex tex="B" /> are <em>disjoint</em>. If they
          could possibly happen together, you must subtract{" "}
          <Tex tex="P(A \cap B)" />.
        </p>
      </Callout>
    </LessonShell>
  );
}
