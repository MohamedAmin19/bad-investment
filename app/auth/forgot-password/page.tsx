"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";
import { useAuth } from "@/contexts/AuthContext";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      let errorMessage = "Failed to send reset email. Please try again.";
      if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
        <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />

        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <div className="w-full max-w-md">
            <div className="mb-8 flex flex-col gap-4">
              <h1
                className="text-3xl uppercase tracking-[0.4rem]"
                style={{ fontFamily: "var(--font-karantina)" }}
              >
                Reset Password
              </h1>
              <p
                className="text-sm text-white/70"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {success ? (
              <div className="flex flex-col gap-6">
                <div className="text-sm uppercase tracking-[0.1rem] text-green-400">
                  Password reset email sent! Please check your inbox.
                </div>
                <Link
                  href="/auth/login"
                  className="rounded-sm bg-white/20 px-8 py-3 text-center text-sm uppercase tracking-[0.3rem] text-white transition-opacity hover:opacity-80"
                  style={{ fontFamily: "var(--font-league-spartan)" }}
                >
                  Back to Login
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="border-b border-white/20 bg-transparent pb-3 text-base text-white outline-none focus:border-white disabled:opacity-50"
                />

                {error && (
                  <div className="text-sm uppercase tracking-[0.1rem] text-red-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-sm bg-white/20 px-8 py-3 text-sm uppercase tracking-[0.3rem] text-white transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>

                <div className="text-center text-sm">
                  <Link
                    href="/auth/login"
                    className="text-white/60 transition-opacity hover:opacity-70"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 pb-10 md:px-10">
        <SiteFooter
          brand="BADINVSTMNT"
          navLinks={[
            { label: "Company", href: "#company", isPrimary: true },
            { label: "FAQ", href: "#faq", isPrimary: true },
          ]}
          socialLinks={socialLinks}
          legalLinks={[
            { label: "Terms of service", href: "#terms" },
            { label: "Privacy & cookie policy", href: "#privacy" },
          ]}
        />
      </div>
    </main>
  );
}

