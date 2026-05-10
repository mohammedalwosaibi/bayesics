import { SignIn } from "@clerk/nextjs";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata = {
  title: "Sign in — Bayesics",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="grow">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-16 md:py-24">
          <SignIn
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/curriculum"
            appearance={{
              elements: {
                card: "shadow-none border border-[color:var(--rule)] rounded-2xl",
              },
            }}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
