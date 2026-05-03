import { LessonShell } from "@/components/lesson/LessonShell";
import { Tex } from "@/components/Math";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Foundations · Unit test — Bayesics",
};

export default function Page() {
  const m = getModule("foundations");
  if (!m) notFound();
  return (
    <LessonShell module={m} isUnitTest>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          This question pulls together everything from Module 1: sample
          spaces, the multiplication principle, counting permutations
          without repetition, and inclusion–exclusion. Take your time —
          there's no clock.
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <strong>Sample space:</strong> what set of outcomes are you
            counting? Write it out before computing.
          </li>
          <li>
            <strong>Counting:</strong> use the multiplication principle to
            size <Tex tex="\Omega" />.
          </li>
          <li>
            <strong>Inclusion–exclusion:</strong> complement is your friend
            — count what's <em>excluded</em>, then subtract.
          </li>
        </ul>
      </section>
    </LessonShell>
  );
}
