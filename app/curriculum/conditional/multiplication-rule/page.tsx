import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { TreeDiagram } from "@/components/viz/TreeDiagram";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("conditional", "multiplication-rule");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Rearranging the definition of conditional probability gives the{" "}
          <strong>multiplication rule</strong> — the workhorse for joint
          probabilities of sequential events:
        </p>
        <TexBlock tex="P(A \cap B) = P(B) \cdot P(A \mid B) = P(A) \cdot P(B \mid A)." />
        <p>
          You can read it left-to-right or right-to-left. Pick whichever
          conditional you actually know.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Drawing two balls without replacement
        </h2>
        <p className="text-[15px] leading-[1.75]">
          An urn has <strong>5 red</strong> and <strong>5 blue</strong> balls.
          Draw two balls without replacement. What's the probability both are
          red?
        </p>
        <TexBlock tex="P(R_1 \cap R_2) = P(R_1) \cdot P(R_2 \mid R_1) = \tfrac{5}{10} \cdot \tfrac{4}{9} = \tfrac{2}{9}." />
        <TreeDiagram
          root="Draw 1"
          branches={[
            {
              label: "Red",
              prob: "5/10",
              children: [
                { label: "Red", prob: "4/9", leafLabel: "P(R,R) = 5/10 · 4/9 = 2/9" },
                { label: "Blue", prob: "5/9", leafLabel: "P(R,B) = 5/10 · 5/9 = 5/18" },
              ],
            },
            {
              label: "Blue",
              prob: "5/10",
              children: [
                { label: "Red", prob: "5/9", leafLabel: "P(B,R) = 5/10 · 5/9 = 5/18" },
                { label: "Blue", prob: "4/9", leafLabel: "P(B,B) = 5/10 · 4/9 = 2/9" },
              ],
            },
          ]}
          caption={
            <span>
              Multiply along each path. The four leaf probabilities sum to 1.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Generalizing the chain
        </h2>
        <p className="text-[15px] leading-[1.75]">
          For any sequence of events,
        </p>
        <TexBlock tex="P(A_1 \cap A_2 \cap \cdots \cap A_n) = P(A_1) \, P(A_2 \mid A_1) \, P(A_3 \mid A_1 \cap A_2) \cdots" />
        <p className="text-[15px] leading-[1.75]">
          Each factor conditions on everything that came before. This is the
          formula behind probability trees in general.
        </p>
      </section>

      <Callout tone="note" title="Tip — think along paths">
        <p>
          Whenever you draw, condition, and then draw again, sketch a tree.
          Multiply along each branch to get a leaf probability; sum across
          leaves to answer "what's the chance of <em>this overall outcome</em>
          ?"
        </p>
      </Callout>
    </LessonShell>
  );
}
