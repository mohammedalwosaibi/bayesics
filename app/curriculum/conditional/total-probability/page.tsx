import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { TreeDiagram } from "@/components/viz/TreeDiagram";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("conditional", "total-probability");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Sometimes you can't compute <Tex tex="P(A)" /> directly, but you{" "}
          <em>can</em> compute it conditional on which "branch" of the world
          you're in. The <strong>law of total probability</strong> stitches
          those branches together.
        </p>
        <p>
          Suppose <Tex tex="B_1, B_2, \dots, B_n" /> is a{" "}
          <strong>partition</strong> of <Tex tex="\Omega" /> — disjoint
          events whose union is everything. Then for any event{" "}
          <Tex tex="A" />:
        </p>
        <TexBlock tex="P(A) = \sum_{i=1}^n P(B_i) \cdot P(A \mid B_i)." />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Two urns, one ball
        </h2>
        <p className="text-[15px] leading-[1.75]">
          <strong>Urn 1</strong> holds 2 red and 3 blue balls.{" "}
          <strong>Urn 2</strong> holds 4 red and 1 blue. A fair coin picks the
          urn, then you draw one ball. What's the probability it's red?
        </p>
        <TreeDiagram
          root="Coin"
          branches={[
            {
              label: "Urn 1",
              prob: "1/2",
              children: [
                { label: "Red", prob: "2/5", leafLabel: "1/2 · 2/5 = 2/10" },
                { label: "Blue", prob: "3/5", leafLabel: "1/2 · 3/5 = 3/10" },
              ],
            },
            {
              label: "Urn 2",
              prob: "1/2",
              children: [
                { label: "Red", prob: "4/5", leafLabel: "1/2 · 4/5 = 4/10" },
                { label: "Blue", prob: "1/5", leafLabel: "1/2 · 1/5 = 1/10" },
              ],
            },
          ]}
          caption={
            <span>
              Multiply along each path, then sum the red leaves to answer.
            </span>
          }
        />
        <TexBlock tex="P(R) = \tfrac{1}{2} \cdot \tfrac{2}{5} + \tfrac{1}{2} \cdot \tfrac{4}{5} = \tfrac{6}{10} = 0.6." />
      </section>

      <Callout tone="note" title="The pattern">
        <p>
          Whenever a problem says "first some <em>cause</em> happens, then
          something else <em>given</em> that cause," the law of total
          probability is your tool. The causes <Tex tex="B_i" /> are the
          partition; their conditionals <Tex tex="P(A \mid B_i)" /> are what
          you can compute directly.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Why a partition?
        </h2>
        <p className="text-[15px] leading-[1.75]">
          A partition guarantees every outcome belongs to exactly one{" "}
          <Tex tex="B_i" />. That's why the disjoint events{" "}
          <Tex tex="A \cap B_i" /> add up cleanly to <Tex tex="A" />:
        </p>
        <TexBlock tex="A = \bigsqcup_{i=1}^n (A \cap B_i)." />
        <p className="text-[15px] leading-[1.75]">
          Apply the additivity axiom and the multiplication rule, and the law
          falls right out.
        </p>
      </section>
    </LessonShell>
  );
}
