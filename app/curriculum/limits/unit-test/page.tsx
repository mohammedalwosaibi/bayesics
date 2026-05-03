import { LessonShell } from "@/components/lesson/LessonShell";
import { Tex } from "@/components/Math";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Limit Theorems · Unit test — Bayesics",
};

export default function Page() {
  const m = getModule("limits");
  if (!m) notFound();
  return (
    <LessonShell module={m} isUnitTest>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          The last step here is approximation: replace a huge binomial count
          with a normal curve and read the probability off standard deviations.
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <strong>Find the center:</strong> for 10,000 fair flips,{" "}
            <Tex tex="\mu = np = 5000" />.
          </li>
          <li>
            <strong>Find the spread:</strong>{" "}
            <Tex tex="\sigma = \sqrt{np(1-p)} = 50" />.
          </li>
          <li>
            <strong>Standardize the band:</strong> 4,900 to 5,100 is exactly{" "}
            <Tex tex="\pm 2\sigma" />.
          </li>
        </ul>
      </section>
    </LessonShell>
  );
}
