import { ModuleOverview } from "@/components/lesson/ModuleOverview";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Discrete Random Variables — Bayesics curriculum",
  description: "Module 3 — numbers that come from chance.",
};

export default function Page() {
  const m = getModule("discrete");
  if (!m) notFound();
  return <ModuleOverview module={m} />;
}
