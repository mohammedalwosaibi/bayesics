import { ModuleOverview } from "@/components/lesson/ModuleOverview";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Conditional Probability — Bayesics curriculum",
  description: "Module 2 — how information reshapes the odds.",
};

export default function Page() {
  const m = getModule("conditional");
  if (!m) notFound();
  return <ModuleOverview module={m} />;
}
