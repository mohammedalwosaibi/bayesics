import { LessonShell } from "@/components/lesson/LessonShell";
import { Tex } from "@/components/Math";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Conditional Probability · Unit test — Bayesics",
};

export default function Page() {
  const m = getModule("conditional");
  if (!m) notFound();
  return (
    <LessonShell module={m} isUnitTest>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          This one ties together conditioning, total probability, and Bayes&apos;
          theorem. The main job is to keep the story straight: prior branch,
          defect likelihood, then posterior.
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <strong>Partition first:</strong> split the outcome space into the
            machine that made the item.
          </li>
          <li>
            <strong>Build the denominator:</strong> compute{" "}
            <Tex tex="P(D)" /> using the law of total probability.
          </li>
          <li>
            <strong>Then invert:</strong> Bayes turns{" "}
            <Tex tex="P(D \mid B)" /> into <Tex tex="P(B \mid D)" />.
          </li>
        </ul>
      </section>
    </LessonShell>
  );
}
