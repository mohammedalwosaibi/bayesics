import { ModuleOverview } from "@/components/lesson/ModuleOverview";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Foundations — Bayesics curriculum",
  description: "Module 1 — outcomes, events, and how to count them.",
};

export default function Page() {
  const m = getModule("foundations");
  if (!m) notFound();
  return <ModuleOverview module={m} />;
}
