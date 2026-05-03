import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("continuous", "variance-continuous");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          Same definitions, integrals instead of sums:
        </p>
        <TexBlock tex="\mathrm{Var}(X) = E[(X - \mu)^2] = \int_{-\infty}^{\infty} (x - \mu)^2 \, f_X(x) \, dx." />
        <p>
          The shortcut formula <Tex tex="\mathrm{Var}(X) = E[X^2] - \mu^2" />{" "}
          still applies — usually easier.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Uniform on <Tex tex="[a, b]" />
        </h2>
        <TexBlock tex="E[X] = \tfrac{a + b}{2}, \qquad \mathrm{Var}(X) = \tfrac{(b - a)^2}{12}." />
        <p className="text-[15px] leading-[1.75]">
          For Uniform <Tex tex="(0, 1)" />: variance{" "}
          <Tex tex="1/12 \approx 0.083" />, standard deviation{" "}
          <Tex tex="\approx 0.289" />.
        </p>
      </section>

      <Callout tone="note" title="Same identities, same uses">
        <p>
          All the discrete identities still apply:{" "}
          <Tex tex="\mathrm{Var}(aX + b) = a^2 \mathrm{Var}(X)" />, and{" "}
          <Tex tex="\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y)" />{" "}
          for independent <Tex tex="X" /> and <Tex tex="Y" />.
        </p>
      </Callout>
    </LessonShell>
  );
}
