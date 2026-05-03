import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { SampleSpaceGrid } from "@/components/viz/SampleSpaceGrid";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("conditional", "conditional-definition");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Probability changes when you learn something. The{" "}
          <strong>conditional probability</strong> of <Tex tex="A" /> given{" "}
          <Tex tex="B" /> — written <Tex tex="P(A \mid B)" /> — answers:{" "}
          "if I already know <Tex tex="B" /> happened, what's the chance of{" "}
          <Tex tex="A" />?"
        </p>
        <TexBlock tex="P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad \text{whenever } P(B) > 0." />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Restrict, then renormalize
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Geometrically, conditioning <em>shrinks the sample space</em> to{" "}
          <Tex tex="B" /> and asks how much of <Tex tex="A" /> is in there.
          The denominator <Tex tex="P(B)" /> rescales so the new probabilities
          still sum to 1.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Two dice — sum given the first roll
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Roll two fair dice. Let <Tex tex="A" /> = "sum is 7" and{" "}
          <Tex tex="B" /> = "first roll is even." The grid below shades both
          events. <Tex tex="P(A \mid B)" /> is the count of dark cells over
          the count of soft-shaded cells.
        </p>
        <SampleSpaceGrid
          rows={6}
          cols={6}
          rowHeader={(r) => r + 1}
          colHeader={(c) => c + 1}
          rowAxisLabel={<Tex tex="\text{die 1}" />}
          colAxisLabel={<Tex tex="\text{die 2}" />}
          highlight={(r, c) => r + c + 2 === 7 && (r + 1) % 2 === 0}
          secondary={(r, c) => (r + 1) % 2 === 0}
          legend={{
            primary: "sum = 7 ∩ first even",
            secondary: "first roll even (B)",
            intersection: "A ∩ B",
          }}
          caption={
            <span>
              Three of the 18 cells in <Tex tex="B" /> have sum 7, so{" "}
              <Tex tex="P(A \mid B) = 3/18 = 1/6" />. Same as the unconditional{" "}
              <Tex tex="P(A) = 1/6" />! These two events are independent — the
              first die's parity tells you nothing about whether the sum is 7.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          A case where conditioning <em>does</em> change the answer
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Now let <Tex tex="A" /> = "sum is at least 9" and <Tex tex="B" /> =
          "first roll is 6." Conditioning on a high first roll dramatically
          changes the chance of a high sum:
        </p>
        <SampleSpaceGrid
          rows={6}
          cols={6}
          rowHeader={(r) => r + 1}
          colHeader={(c) => c + 1}
          rowAxisLabel={<Tex tex="\text{die 1}" />}
          colAxisLabel={<Tex tex="\text{die 2}" />}
          highlight={(r, c) => r + c + 2 >= 9 && r + 1 === 6}
          secondary={(r, c) => r + 1 === 6}
          legend={{
            primary: "sum ≥ 9 ∩ first = 6",
            secondary: "first = 6 (B)",
            intersection: "A ∩ B",
          }}
          caption={
            <span>
              <Tex tex="P(A \mid B) = 4/6 = 2/3" />, while the unconditional{" "}
              <Tex tex="P(A) = 10/36 \approx 0.28" />. Knowing <Tex tex="B" />
              {" "}<em>more than doubled</em> the probability.
            </span>
          }
        />
      </section>

      <Callout tone="trap" title="Direction matters">
        <p>
          <Tex tex="P(A \mid B)" /> and <Tex tex="P(B \mid A)" /> are
          generally different numbers. Confusing them is the heart of the
          prosecutor's fallacy and most failures of medical-test intuition.
          We'll come back to this when we hit Bayes' theorem.
        </p>
      </Callout>
    </LessonShell>
  );
}
