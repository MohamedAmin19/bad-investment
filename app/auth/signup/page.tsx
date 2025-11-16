"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (): string | null => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const validationError = validatePassword();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      await signup(email, password);
      router.push("/profile");
    } catch (err: any) {
      let errorMessage = "Failed to create account. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "An account with this email already exists.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password.";
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
                Sign Up
              </h1>
              <p
                className="text-sm text-white/70"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                Create an account to track your orders and manage your profile.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="border-b border-white/20 bg-transparent pb-3 text-base text-white outline-none focus:border-white disabled:opacity-50"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                  className="border-b border-white/20 bg-transparent pb-3 text-base text-white outline-none focus:border-white disabled:opacity-50"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                  className="border-b border-white/20 bg-transparent pb-3 text-base text-white outline-none focus:border-white disabled:opacity-50"
                />
              </div>

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
                {isLoading ? "Creating account..." : "Sign Up"}
              </button>

              <div className="text-center text-sm text-white/60">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-white transition-opacity hover:opacity-70"
                >
                  Login
                </Link>
              </div>
            </form>
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

