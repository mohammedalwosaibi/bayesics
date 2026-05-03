import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("foundations", "multiplication-principle");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Whenever a process happens in stages, the total number of outcomes
          is the <strong>product</strong> of the choices at each stage. This
          is the <strong>multiplication principle</strong>.
        </p>
        <TexBlock tex="\text{stages with } k_1, k_2, \dots, k_n \text{ choices each} \;\Longrightarrow\; k_1 \cdot k_2 \cdots k_n \text{ total}." />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Building a meal
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Suppose you can pick from <strong>3</strong> appetizers,{" "}
          <strong>4</strong> mains, and <strong>2</strong> desserts. How many
          three-course meals are possible?
        </p>
        <TexBlock tex="3 \times 4 \times 2 = 24." />
        <p className="text-[15px] leading-[1.75]">
          Every appetizer can be paired with any main, and every (appetizer,
          main) pair with any dessert — so the choices multiply.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          A two-level tree
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Counting three flips of a fair coin: <Tex tex="2" /> outcomes per
          flip, three flips,{" "}
          <Tex tex="2 \times 2 \times 2 = 8" /> total outcomes:
        </p>
        <TexBlock tex="\Omega = \{HHH,\, HHT,\, HTH,\, HTT,\, THH,\, THT,\, TTH,\, TTT\}." />
      </section>

      <Callout tone="note" title="When stages depend on each other">
        <p>
          The principle still works if later choices <em>depend</em> on
          earlier ones — what matters is the count at each stage, not its
          identity. Drawing two cards from a deck without replacement: 52
          choices for the first, 51 for the second, so{" "}
          <Tex tex="52 \times 51 = 2652" /> ordered pairs.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          PIN codes
        </h2>
        <p className="text-[15px] leading-[1.75]">
          A 4-digit PIN where <em>any</em> digit 0–9 can repeat:{" "}
          <Tex tex="10^4 = 10{,}000" /> codes. A 4-digit PIN with{" "}
          <em>no repeats</em>: <Tex tex="10 \times 9 \times 8 \times 7 = 5040" />
          .
        </p>
      </section>

      <Callout tone="trap" title="Don't add when you should multiply">
        <p>
          "I have 3 shirts and 4 pants — I have 7 outfits." No. You have{" "}
          <Tex tex="3 \times 4 = 12" /> outfits. Adding answers a different
          question ("how many wardrobe items?"). When in doubt, ask: <em>does
          each choice combine with each other choice?</em> If yes, multiply.
        </p>
      </Callout>
    </LessonShell>
  );
}
