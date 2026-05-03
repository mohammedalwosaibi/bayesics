import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { SampleSpaceGrid } from "@/components/viz/SampleSpaceGrid";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("foundations", "equally-likely");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          When every outcome in <Tex tex="\Omega" /> is equally likely — fair
          coins, fair dice, well-shuffled cards — probability becomes a
          counting problem:
        </p>
        <TexBlock tex="P(A) = \frac{|A|}{|\Omega|} = \frac{\text{outcomes in } A}{\text{outcomes in } \Omega}." />
        <p>
          That's it. The whole skill is recognizing when symmetry is in play,
          and then carefully counting both the numerator and denominator.
        </p>
      </section>

      <Callout tone="warn" title="Equally likely is an assumption">
        <p>
          Symmetry doesn't apply by default — you have to argue for it. A
          weighted die, a non-shuffled deck, or "the next car on the highway
          is red or not red" don't qualify. Spotting when the assumption{" "}
          <em>does</em> hold is half the game.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Two dice — sums
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Roll two fair dice. The sample space has <Tex tex="6 \times 6 = 36" />{" "}
          equally likely ordered pairs. The event "sum is 7" picks out six of
          them: <Tex tex="(1,6),\, (2,5),\, (3,4),\, (4,3),\, (5,2),\, (6,1)" />.
        </p>
        <SampleSpaceGrid
          rows={6}
          cols={6}
          rowHeader={(r) => r + 1}
          colHeader={(c) => c + 1}
          rowAxisLabel={<Tex tex="\text{die 1}" />}
          colAxisLabel={<Tex tex="\text{die 2}" />}
          highlight={(r, c) => r + c + 2 === 7}
          cellLabel={(r, c) => r + c + 2}
          legend={{ primary: "sum = 7" }}
          caption={
            <span>
              <Tex tex="P(\text{sum} = 7) = 6/36 = 1/6" />.
            </span>
          }
        />
        <p className="text-[15px] leading-[1.75]">
          The same grid answers a dozen questions just by changing which cells
          you shade. Try "sum is even," "first die is 6," or "sum is at most
          4" — count cells, divide by 36.
        </p>
      </section>

      <Callout tone="trap" title="Equally likely outcomes ≠ equally likely values">
        <p>
          When you sum two dice, the <em>pairs</em> are equally likely — but
          the <em>sums</em> are not. There's exactly one way to get a sum of
          2, but six ways to get a sum of 7. Always count outcomes in{" "}
          <Tex tex="\Omega" />, never values of a derived quantity.
        </p>
      </Callout>
    </LessonShell>
  );
}
