import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { VennDiagram } from "@/components/viz/VennDiagram";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("foundations", "set-operations");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Once you have a sample space, you describe events as <em>sets</em>.
          Three operations let you combine them.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Union: <Tex tex="A \cup B" /> — "<em>A</em> or <em>B</em>"
        </h2>
        <p className="text-[15px] leading-[1.75]">
          The union <Tex tex="A \cup B" /> contains every outcome in{" "}
          <Tex tex="A" />, every outcome in <Tex tex="B" />, or both. Read{" "}
          <Tex tex="\cup" /> as "or" — but a non-exclusive "or" that also
          allows both.
        </p>
        <VennDiagram
          shaded="AuB"
          labels={{ A: "A", B: "B" }}
          caption={
            <span>
              <Tex tex="A \cup B" /> — everything inside either circle.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Intersection: <Tex tex="A \cap B" /> — "<em>A</em> and <em>B</em>"
        </h2>
        <p className="text-[15px] leading-[1.75]">
          The intersection <Tex tex="A \cap B" /> contains the outcomes that
          are in <strong>both</strong> sets. Read <Tex tex="\cap" /> as "and."
        </p>
        <VennDiagram
          shaded="AnB"
          labels={{ A: "A", B: "B" }}
          caption={
            <span>
              <Tex tex="A \cap B" /> — the overlap only.
            </span>
          }
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Complement: <Tex tex="A^c" /> — "not <em>A</em>"
        </h2>
        <p className="text-[15px] leading-[1.75]">
          The complement <Tex tex="A^c" /> contains every outcome in{" "}
          <Tex tex="\Omega" /> that is <em>not</em> in <Tex tex="A" />. So{" "}
          <Tex tex="A \cup A^c = \Omega" /> and{" "}
          <Tex tex="A \cap A^c = \emptyset" />.
        </p>
        <VennDiagram
          shaded="Acomp"
          labels={{ A: "A", B: "B" }}
          caption={
            <span>
              <Tex tex="A^c" /> — everything outside <Tex tex="A" />.
            </span>
          }
        />
      </section>

      <Callout tone="note" title="Worked example">
        <p>
          Roll a fair die. Let <Tex tex="A = \{2, 4, 6\}" /> ("even") and{" "}
          <Tex tex="B = \{4, 5, 6\}" /> ("at least 4"). Then:
        </p>
        <ul className="ml-5 mt-2 list-disc space-y-1">
          <li>
            <Tex tex="A \cup B = \{2, 4, 5, 6\}" />
          </li>
          <li>
            <Tex tex="A \cap B = \{4, 6\}" />
          </li>
          <li>
            <Tex tex="A^c = \{1, 3, 5\}" />
          </li>
        </ul>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Disjoint events
        </h2>
        <p className="text-[15px] leading-[1.75]">
          If <Tex tex="A \cap B = \emptyset" />, the events <em>cannot both
          happen</em> on the same trial — they are <strong>disjoint</strong>{" "}
          (or <strong>mutually exclusive</strong>). Rolling a 1 and rolling a
          6 on the same die: disjoint. Rolling an even number and rolling at
          least 4: <em>not</em> disjoint, because 4 and 6 are in both.
        </p>
        <TexBlock tex="A \cap B = \emptyset \;\Longleftrightarrow\; A \text{ and } B \text{ are disjoint}" />
      </section>

      <Callout tone="warn" title="De Morgan's laws">
        <p>
          The complement of a union is the intersection of complements, and
          vice versa:
        </p>
        <p className="mt-2">
          <Tex tex="(A \cup B)^c = A^c \cap B^c" /> · <Tex tex="(A \cap B)^c = A^c \cup B^c" />
        </p>
      </Callout>
    </LessonShell>
  );
}
