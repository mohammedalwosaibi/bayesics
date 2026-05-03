import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { NormalCurve } from "@/components/viz/NormalCurve";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("limits", "normal-approx-binomial");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          A binomial count becomes well approximated by a normal distribution
          when <Tex tex="n" /> is large and <Tex tex="p" /> is not too close
          to 0 or 1.
        </p>
        <TexBlock tex="X \sim \mathrm{Binomial}(n,p) \approx N\big(np,\; np(1-p)\big)." />
        <p>
          This is one of the most useful applications of the CLT.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Binomial(100, 0.5)
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Here <Tex tex="\mu=np=50" /> and{" "}
          <Tex tex="\sigma=\sqrt{np(1-p)}=5" />. To estimate{" "}
          <Tex tex="P(X \geq 60)" />, standardize 60:
        </p>
        <TexBlock tex="Z = \frac{60-50}{5} = 2 \qquad \Longrightarrow \qquad P(X \geq 60) \approx P(Z \geq 2) \approx 0.0228." />
        <NormalCurve
          mu={50}
          sigma={5}
          markX={60}
          shadeRange={[60, 70]}
          caption={
            <span>
              The shaded right tail is the normal approximation to{" "}
              <Tex tex="P(X \geq 60)" />.
            </span>
          }
        />
      </section>

      <Callout tone="note" title="Continuity correction">
        <p>
          A more careful approximation replaces{" "}
          <Tex tex="P(X \geq 60)" /> with <Tex tex="P(Y \geq 59.5)" /> for the
          continuous normal variable <Tex tex="Y" />. This continuity
          correction usually improves accuracy, but the uncluttered version is
          a good first pass.
        </p>
      </Callout>
    </LessonShell>
  );
}
