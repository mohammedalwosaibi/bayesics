import { ModuleOverview } from "@/components/lesson/ModuleOverview";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Continuous Random Variables — Bayesics curriculum",
  description: "Module 4 — from bars to curves.",
};

export default function Page() {
  const m = getModule("continuous");
  if (!m) notFound();
  return <ModuleOverview module={m} />;
}
