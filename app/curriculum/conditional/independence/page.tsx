import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { SampleSpaceGrid } from "@/components/viz/SampleSpaceGrid";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("conditional", "independence");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Two events are <strong>independent</strong> when knowing one tells
          you nothing about the other. Formally:
        </p>
        <TexBlock tex="A,\, B \text{ independent} \;\Longleftrightarrow\; P(A \cap B) = P(A) \cdot P(B)." />
        <p>Equivalently (when <Tex tex="P(B) > 0" />):</p>
        <TexBlock tex="P(A \mid B) = P(A)." />
        <p>The conditional equals the unconditional — the new information didn't move the needle.</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Two coin flips
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Flipping a fair coin twice: <Tex tex="P(\text{first H}) = 1/2" />,
          <Tex tex="P(\text{second H}) = 1/2" />, and{" "}
          <Tex tex="P(\text{both H}) = 1/4 = 1/2 \cdot 1/2" />. The flips are
          independent — the coin has no memory.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          A trickier example
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Roll two fair dice. Are <Tex tex="A" /> = "first die is even" and{" "}
          <Tex tex="B" /> = "sum is 7" independent? Check:
        </p>
        <SampleSpaceGrid
          rows={6}
          cols={6}
          rowHeader={(r) => r + 1}
          colHeader={(c) => c + 1}
          rowAxisLabel={<Tex tex="\text{die 1}" />}
          colAxisLabel={<Tex tex="\text{die 2}" />}
          highlight={(r, c) => (r + 1) % 2 === 0 && r + c + 2 === 7}
          secondary={(r, c) => (r + 1) % 2 === 0 || r + c + 2 === 7}
          legend={{
            primary: "A ∩ B",
            secondary: "A ∪ B",
          }}
        />
        <ul className="ml-5 list-disc space-y-1 text-[15px] leading-[1.75]">
          <li>
            <Tex tex="P(A) = 18/36 = 1/2" />
          </li>
          <li>
            <Tex tex="P(B) = 6/36 = 1/6" />
          </li>
          <li>
            <Tex tex="P(A \cap B) = 3/36 = 1/12 = (1/2)(1/6)" /> ✓
          </li>
        </ul>
        <p className="text-[15px] leading-[1.75]">
          Independent. Even though "even first die" and "sum 7" both involve
          the same dice, the parity of the first die genuinely doesn't change
          the chance of summing to 7.
        </p>
      </section>

      <Callout tone="warn" title="Independent ≠ disjoint">
        <p>
          Disjoint events <em>cannot</em> happen together —{" "}
          <Tex tex="P(A \cap B) = 0" />. Independent events {""}
          <em>can</em> happen together —{" "}
          <Tex tex="P(A \cap B) = P(A) P(B)" />. In fact, two events with
          positive probability that are disjoint are <em>maximally
          dependent</em>: knowing one happened tells you the other definitely
          didn't.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Many independent events
        </h2>
        <p className="text-[15px] leading-[1.75]">
          A collection <Tex tex="A_1, \dots, A_n" /> is{" "}
          <strong>mutually independent</strong> if the joint probability of
          any subset factors:
        </p>
        <TexBlock tex="P\left(\bigcap_{i \in S} A_i\right) = \prod_{i \in S} P(A_i) \quad \text{for every subset } S." />
        <p className="text-[15px] leading-[1.75]">
          Pairwise independence isn't enough — you need the factorization to
          hold for triples, quadruples, and so on.
        </p>
      </section>
    </LessonShell>
  );
}
