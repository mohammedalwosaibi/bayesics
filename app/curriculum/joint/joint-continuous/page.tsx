import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("joint", "joint-continuous");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          For continuous pairs, probability lives in <strong>area</strong>,
          not in individual points. The joint density plays the role the joint
          PMF used to play:
        </p>
        <TexBlock tex="P\big((X,Y)\in A\big)=\iint_A f_{X,Y}(x,y)\,dx\,dy." />
        <p>
          A single point still has probability 0. What matters is the size of
          the region you integrate over.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Uniform on the unit square
        </h2>
        <p className="text-[15px] leading-[1.75]">
          If <Tex tex="(X,Y)" /> is uniform on <Tex tex="[0,1]^2" />, then
          the density is 1 everywhere inside the square. So probabilities are
          just areas.
        </p>
        <figure className="my-6">
          <svg
            viewBox="0 0 260 220"
            className="mx-auto block h-auto w-full max-w-sm"
            role="img"
            aria-label="Unit square with triangle x plus y less than or equal to one"
          >
            <rect x="40" y="20" width="160" height="160" fill="var(--surface)" stroke="var(--rule)" />
            <polygon points="40,180 40,20 200,180" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.4" />
            <line x1="40" y1="20" x2="200" y2="180" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="4 4" />
            <text x="204" y="184" fontSize="12" fill="var(--muted)">1</text>
            <text x="26" y="26" fontSize="12" fill="var(--muted)">1</text>
            <text x="114" y="196" fontSize="12" fill="var(--muted)">x</text>
            <text x="24" y="104" fontSize="12" fill="var(--muted)">y</text>
            <text x="130" y="84" fontSize="12" fill="var(--fg)">x + y = 1</text>
          </svg>
          <figcaption className="mt-3 text-center text-[12px] leading-relaxed text-[color:var(--muted)]">
            The shaded triangle is the event <Tex tex="X + Y \leq 1" />.
          </figcaption>
        </figure>
        <TexBlock tex="P(X+Y \leq 1)=\text{area of triangle}=\tfrac12." />
      </section>

      <Callout tone="note" title="Marginals come from integration">
        <p>
          In the continuous case, <em>sum out the other variable</em> becomes{" "}
          <em>integrate out the other variable</em>:
          <Tex tex="f_X(x)=\int f_{X,Y}(x,y)\,dy" className="ml-1" />.
        </p>
      </Callout>
    </LessonShell>
  );
}
