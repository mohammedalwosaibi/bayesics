import { LessonShell } from "@/components/lesson/LessonShell";
import { Tex } from "@/components/Math";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Discrete Random Variables · Unit test — Bayesics",
};

export default function Page() {
  const m = getModule("discrete");
  if (!m) notFound();
  return (
    <LessonShell module={m} isUnitTest>
      <section className="space-y-4 text-[15px] leading-[1.75]">
        <p>
          This question compresses the whole discrete module into one line:
          identify the distribution, then recall which summary formula you
          actually need.
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <strong>Name the model:</strong> a count of successes across
            repeated independent flips is binomial.
          </li>
          <li>
            <strong>Watch the target:</strong> the prompt asks for{" "}
            <em>variance</em>, not the mean.
          </li>
          <li>
            <strong>Use the shortcut:</strong> for{" "}
            <Tex tex="\mathrm{Binomial}(n,p)" />,{" "}
            <Tex tex="\mathrm{Var}(X) = np(1-p)" />.
          </li>
        </ul>
      </section>
    </LessonShell>
  );
}
