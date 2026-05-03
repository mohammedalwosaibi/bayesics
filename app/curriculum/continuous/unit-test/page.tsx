import { LessonShell } from "@/components/lesson/LessonShell";
import { Tex } from "@/components/Math";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Continuous Random Variables · Unit test — Bayesics",
};

export default function Page() {
  const m = getModule("continuous");
  if (!m) notFound();
  return (
    <LessonShell module={m} isUnitTest>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The unit test leans on one of the most useful ideas in continuous
          probability: exponential waiting times forget the past.
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <strong>Translate the mean:</strong> mean 10 minutes means rate{" "}
            <Tex tex="\lambda = 1/10" /> per minute.
          </li>
          <li>
            <strong>Use memorylessness:</strong> after waiting 5 minutes, the
            additional wait still has the same exponential law.
          </li>
          <li>
            <strong>Apply the tail:</strong> <Tex tex="P(X > t) = e^{-\lambda t}" />.
          </li>
        </ul>
      </section>
    </LessonShell>
  );
}
