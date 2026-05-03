import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { SampleSpaceGrid } from "@/components/viz/SampleSpaceGrid";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("foundations", "sample-spaces");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Probability is the math of <strong>chance</strong>. Before we can
          assign a number to anything, we have to write down what could happen.
          The complete list of possible outcomes is called the{" "}
          <strong>sample space</strong>, written <Tex tex="\Omega" /> (capital
          omega).
        </p>
        <p>
          A single thing that could happen — like rolling a 4 — is an{" "}
          <strong>outcome</strong>. A collection of outcomes you care about —
          like "rolled an even number" — is an <strong>event</strong>. Events
          are subsets of <Tex tex="\Omega" />.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Roll one die
        </h2>
        <p className="text-[15px] leading-[1.75]">
          The sample space is six outcomes — one per face:
        </p>
        <TexBlock tex="\Omega = \{1,\, 2,\, 3,\, 4,\, 5,\, 6\}" />
        <p className="text-[15px] leading-[1.75]">
          The event "rolled an even number" picks out the subset{" "}
          <Tex tex="E = \{2, 4, 6\}" />. The event "rolled at least 5" picks
          out <Tex tex="\{5, 6\}" />. Same sample space, different events.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Roll two dice
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Now the sample space is every pair{" "}
          <Tex tex="(i, j)" /> with{" "}
          <Tex tex="i, j \in \{1, \dots, 6\}" />. That's a 6×6 grid — 36
          outcomes. Visualizing it is the easiest way to spot events:
        </p>
        <SampleSpaceGrid
          rows={6}
          cols={6}
          rowHeader={(r) => r + 1}
          colHeader={(c) => c + 1}
          rowAxisLabel={<Tex tex="\text{die 1}" />}
          colAxisLabel={<Tex tex="\text{die 2}" />}
          highlight={(r, c) => r + c + 2 === 7}
          legend={{ primary: "sum equals 7" }}
          caption={
            <span>
              The shaded diagonal is the event "sum is 7" — six outcomes out
              of 36.
            </span>
          }
        />
      </section>

      <Callout tone="note" title="Vocabulary">
        <p>
          <strong>Outcome:</strong> one specific thing that happened, like the
          pair <Tex tex="(3, 4)" />.
        </p>
        <p>
          <strong>Event:</strong> a set of outcomes you care about, like{" "}
          <Tex tex="\{(i, j) : i + j = 7\}" />.
        </p>
        <p>
          <strong>Sample space</strong> <Tex tex="\Omega" />: every outcome
          that could possibly happen.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          The whole and the impossible
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Two events appear in every sample space:
        </p>
        <ul className="ml-5 list-disc space-y-1.5 text-[15px] leading-[1.75]">
          <li>
            The whole space <Tex tex="\Omega" /> — the event{" "}
            &ldquo;<em>something</em>{" "}happens.&rdquo; This is certain.
          </li>
          <li>
            The empty event <Tex tex="\emptyset" /> — the event{" "}
            &ldquo;nothing in <Tex tex="\Omega" />{" "}happens.&rdquo; This is
            impossible.
          </li>
        </ul>
        <p className="text-[15px] leading-[1.75]">
          Probability assigns 1 to the first and 0 to the second. We'll prove
          why in the lesson on axioms — for now, hold the picture: pin down{" "}
          <Tex tex="\Omega" /> first, then describe events as subsets of it.
        </p>
      </section>
    </LessonShell>
  );
}
