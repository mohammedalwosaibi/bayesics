import { ModuleOverview } from "@/components/lesson/ModuleOverview";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Limit Theorems — Bayesics curriculum",
  description: "Module 6 — why averages get predictable.",
};

export default function Page() {
  const m = getModule("limits");
  if (!m) notFound();
  return <ModuleOverview module={m} />;
}
