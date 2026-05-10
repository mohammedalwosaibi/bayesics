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
          ["--fg" as string]: "#0b0b12",
          ["--muted" as string]: "#5b5b6e",
          ["--surface" as string]: "#f6f7fb",
          ["--surface-raised" as string]: "#ccc",
          ["--rule" as string]: "rgba(11, 11, 18, 0.10)",
          ["--accent" as string]: "#4f46e5",
          ["--accent-fg" as string]: "#ffffff",
          ["--accent-soft" as string]: "rgba(79, 70, 229, 0.08)",
          ["--sim-rule" as string]: "rgba(11, 11, 18, 0.08)",
          ["--sim-track" as string]: "rgba(11, 11, 18, 0.12)",
          ["--mcq-border" as string]: "rgba(11, 11, 18, 0.12)",
          ["--mcq-hover" as string]: "rgba(11, 11, 18, 0.03)",
          ["--mcq-explain-bg" as string]: "rgba(79, 70, 229, 0.06)",
          ["--mcq-cta-bg" as string]: "#4f46e5",
          ["--mcq-cta-fg" as string]: "#ffffff",
          ["--lp-border" as string]: "rgba(11, 11, 18, 0.08)",
          ["--lp-veil" as string]: "rgba(255, 255, 255, 0.75)",
          ["--lp-veil-b" as string]: "rgba(255, 255, 255, 0.98)",
          ["--lp-tier-fg" as string]: "#5b5b6e",
          ["--lp-label-fg" as string]: "#0b0b12",
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
