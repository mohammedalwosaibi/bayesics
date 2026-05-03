import { LessonShell } from "@/components/lesson/LessonShell";
import { Callout } from "@/components/lesson/Callout";
import { Tex, TexBlock } from "@/components/Math";
import { getLesson } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export default function Page() {
  const ctx = getLesson("discrete", "variance");
  if (!ctx) notFound();
  return (
    <LessonShell module={ctx.module} lesson={ctx.lesson}>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The expected value gives the average. The <strong>variance</strong>{" "}
          measures how spread out the values are around that average:
        </p>
        <TexBlock tex="\mathrm{Var}(X) = E\big[(X - \mu)^2\big], \quad \mu = E[X]." />
        <p>
          Squaring guarantees the variance is non-negative and penalizes
          large deviations more than small ones. The square root of the
          variance is the <strong>standard deviation</strong>{" "}
          <Tex tex="\sigma_X = \sqrt{\mathrm{Var}(X)}" />, which is in the
          same units as <Tex tex="X" />.
        </p>
      </section>

      <Callout tone="note" title="The shortcut formula">
        <p>
          Expanding the square gives a more convenient identity:
        </p>
        <p className="mt-2">
          <Tex tex="\mathrm{Var}(X) = E[X^2] - (E[X])^2" />.
        </p>
        <p className="mt-1">
          Compute <Tex tex="E[X^2]" />, square the mean, subtract.
        </p>
      </Callout>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Fair die
        </h2>
        <p className="text-[15px] leading-[1.75]">
          Mean is <Tex tex="\mu = 7/2" />. For{" "}
          <Tex tex="E[X^2]" />:
        </p>
        <TexBlock tex="E[X^2] = \tfrac{1 + 4 + 9 + 16 + 25 + 36}{6} = \tfrac{91}{6}." />
        <TexBlock tex="\mathrm{Var}(X) = \tfrac{91}{6} - \left(\tfrac{7}{2}\right)^2 = \tfrac{91}{6} - \tfrac{49}{4} = \tfrac{35}{12} \approx 2.917." />
        <p className="text-[15px] leading-[1.75]">
          Standard deviation: <Tex tex="\sigma \approx 1.71" />. So a typical
          die roll is about 1.7 away from the mean of 3.5 — which matches
          intuition, since the distance from 3.5 to either edge is 2.5.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--quant-display)] text-2xl">
          Affine and additive identities
        </h2>
        <ul className="ml-5 list-disc space-y-1.5 text-[15px] leading-[1.75]">
          <li>
            <Tex tex="\mathrm{Var}(aX + b) = a^2 \, \mathrm{Var}(X)" /> —
            adding a constant doesn't change spread; multiplying scales it
            quadratically.
          </li>
          <li>
            <Tex tex="\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y)" /> —{" "}
            <em>only when <Tex tex="X" /> and <Tex tex="Y" /> are independent</em>.
            For dependent variables you have to add a covariance term (later
            module).
          </li>
        </ul>
      </section>
    </LessonShell>
  );
}
