import { LessonShell } from "@/components/lesson/LessonShell";
import { Tex } from "@/components/Math";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Multiple Random Variables · Unit test — Bayesics",
};

export default function Page() {
  const m = getModule("joint");
  if (!m) notFound();
  return (
    <LessonShell module={m} isUnitTest>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          This wraps together independence, sums, and spread. Once you rewrite
          the total as <Tex tex="S = X + Y" />, the structure becomes much
          simpler than it first looks.
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <strong>Start with one die:</strong> recall{" "}
            <Tex tex="\mathrm{Var}(X) = 35/12" /> for a fair die.
          </li>
          <li>
            <strong>Use independence:</strong> no covariance term is needed.
          </li>
          <li>
            <strong>Add variances:</strong>{" "}
            <Tex tex="\mathrm{Var}(X+Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)" />.
          </li>
        </ul>
      </section>
    </LessonShell>
  );
}
