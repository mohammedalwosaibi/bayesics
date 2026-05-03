import { LessonShell } from "@/components/lesson/LessonShell";
import { Tex } from "@/components/Math";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Stochastic Processes · Unit test — Bayesics",
};

export default function Page() {
  const m = getModule("stochastic");
  if (!m) notFound();
  return (
    <LessonShell module={m} isUnitTest>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          This question checks whether the Poisson-process viewpoint feels
          natural: translate a rate and time window into a count model, then
          evaluate a single PMF value.
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <strong>Scale the interval:</strong> 30 minutes is{" "}
            <Tex tex="0.5" /> hours.
          </li>
          <li>
            <strong>Convert rate to mean count:</strong>{" "}
            <Tex tex="\lambda t = 4 \cdot 0.5 = 2" />.
          </li>
          <li>
            <strong>Use the zero-count formula:</strong>{" "}
            <Tex tex="P(N=0)=e^{-2}" />.
          </li>
        </ul>
      </section>
    </LessonShell>
  );
}
