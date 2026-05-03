import { ModuleOverview } from "@/components/lesson/ModuleOverview";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Stochastic Processes — Bayesics curriculum",
  description: "Module 7 — probability that unfolds over time.",
};

export default function Page() {
  const m = getModule("stochastic");
  if (!m) notFound();
  return <ModuleOverview module={m} />;
}
