import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("joint", "covariance");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          <strong>Covariance</strong> measures whether two variables tend to
          sit above or below their means at the same time.
        </p>
        <TexBlock tex="\mathrm{Cov}(X,Y)=E[(X-E[X])(Y-E[Y])] = E[XY]-E[X]E[Y]." />
        <p>
          Positive covariance means they move together; negative covariance
          means one tends to be high when the other is low.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          A variable with itself
        </h2>
        <p className="text-[15px] leading-[1.75]">
          If <Tex tex="Y=X" />, then covariance collapses to variance:
        </p>
        <TexBlock tex="\mathrm{Cov}(X,X)=\mathrm{Var}(X)." />
        <p className="text-[15px] leading-[1.75]">
          For a fair die, <Tex tex="\mathrm{Var}(X)=35/12" />, so the
          covariance of <Tex tex="X" /> with itself is exactly the same
          number.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Why covariance matters
        </h2>
        <TexBlock tex="\mathrm{Var}(X+Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)+2\,\mathrm{Cov}(X,Y)." />
        <p className="text-[15px] leading-[1.75]">
          This is the correction term that tells you whether adding two random
          variables amplifies spread or partially cancels it out.
        </p>
      </section>

      <Callout tone="trap" title="Zero covariance does not guarantee independence">
        <p>
          Independence always implies zero covariance when expectations
          exist. The reverse is false. Covariance only captures linear
          comovement, not all possible forms of dependence.
        </p>
      </Callout>
    </LessonShell>
  );
}
