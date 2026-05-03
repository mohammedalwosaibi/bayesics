import { ModuleOverview } from "@/components/lesson/ModuleOverview";
import { getModule } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Multiple Random Variables — Bayesics curriculum",
  description: "Module 5 — when two things vary together.",
};

export default function Page() {
  const m = getModule("joint");
  if (!m) notFound();
  return <ModuleOverview module={m} />;
}
