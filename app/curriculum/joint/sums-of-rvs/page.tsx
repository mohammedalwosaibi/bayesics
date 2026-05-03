import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("joint", "sums-of-rvs");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          When you add independent random variables, you create a new random
          variable whose distribution blends the old ones together.
        </p>
        <TexBlock tex="P(X+Y=s)=\sum_x P(X=x)\,P(Y=s-x)" />
        <p>
          That formula is called a <strong>convolution</strong>. It sums over
          every way the total <Tex tex="s" /> could be assembled.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Friendly special cases
        </h2>
        <ul className="ml-5 list-disc space-y-1.5 text-[15px] leading-[1.75]">
          <li>
            If <Tex tex="X \sim \mathrm{Binomial}(n_1,p)" /> and{" "}
            <Tex tex="Y \sim \mathrm{Binomial}(n_2,p)" /> are independent,
            then <Tex tex="X+Y \sim \mathrm{Binomial}(n_1+n_2,p)" />.
          </li>
          <li>
            If <Tex tex="X" /> and <Tex tex="Y" /> are independent normals,
            then <Tex tex="X+Y" /> is normal too, with means and variances
            added.
          </li>
        </ul>
        <p className="text-[15px] leading-[1.75]">
          These closure properties are why sums are such a central object in
          probability.
        </p>
      </section>

      <Callout tone="note" title="Means always add; variances add under independence">
        <p>
          No matter what, <Tex tex="E[X+Y]=E[X]+E[Y]" />. For spread, you need
          either independence or a covariance term:
          <Tex tex="\mathrm{Var}(X+Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)+2\mathrm{Cov}(X,Y)" className="ml-1" />
          .
        </p>
      </Callout>
    </LessonShell>
  );
}
