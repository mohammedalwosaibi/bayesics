import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ProgressSync } from "@/components/ProgressSync";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--quant-display",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-logo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bayesics — probability fluency for ML engineers",
  description:
    "You reach for Bayes every week. Bayesics takes you from muscle memory to real fluency, one live simulator at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body
        className="min-h-full"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          ["--bg" as string]: "#ffffff",
          ["--fg" as string]: "#0c0c16",
          ["--muted" as string]: "#5a5a70",
          ["--surface" as string]: "#f4f4f9",
          ["--surface-raised" as string]: "#e8e8f2",
          ["--rule" as string]: "rgba(12, 12, 22, 0.09)",
          ["--accent" as string]: "#4f46e5",
          ["--accent-fg" as string]: "#ffffff",
          ["--accent-soft" as string]: "rgba(79, 70, 229, 0.07)",
          /* shadow tokens */
          ["--shadow-xs" as string]: "0 1px 2px rgba(12,12,22,0.05)",
          ["--shadow-sm" as string]: "0 1px 3px rgba(12,12,22,0.06), 0 1px 2px rgba(12,12,22,0.04)",
          ["--shadow-md" as string]: "0 4px 12px rgba(12,12,22,0.08), 0 2px 4px rgba(12,12,22,0.04)",
          ["--shadow-card" as string]: "0 2px 8px rgba(12,12,22,0.06), 0 1px 3px rgba(12,12,22,0.04)",
          ["--shadow-card-hover" as string]: "0 8px 28px rgba(12,12,22,0.10), 0 2px 6px rgba(12,12,22,0.05)",
          ["--shadow-accent" as string]: "0 12px 28px -16px rgba(79,70,229,0.90)",
          ["--shadow-accent-hover" as string]: "0 16px 36px -16px rgba(79,70,229,0.95)",
          ["--sim-rule" as string]: "rgba(12, 12, 22, 0.08)",
          ["--sim-track" as string]: "rgba(12, 12, 22, 0.12)",
          ["--mcq-border" as string]: "rgba(12, 12, 22, 0.11)",
          ["--mcq-hover" as string]: "rgba(12, 12, 22, 0.03)",
          ["--mcq-explain-bg" as string]: "rgba(79, 70, 229, 0.06)",
          ["--mcq-cta-bg" as string]: "#4f46e5",
          ["--mcq-cta-fg" as string]: "#ffffff",
          ["--lp-border" as string]: "rgba(12, 12, 22, 0.08)",
          ["--lp-veil" as string]: "rgba(255, 255, 255, 0.80)",
          ["--lp-veil-b" as string]: "rgba(255, 255, 255, 0.98)",
          ["--lp-tier-fg" as string]: "#5a5a70",
          ["--lp-label-fg" as string]: "#0c0c16",
          ["--lp-cta-bg" as string]: "#4f46e5",
          ["--lp-cta-fg" as string]: "#ffffff",
        }}
      >
        <ProgressSync />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
