"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";

type UpdateItem = {
  id: string;
  date: string;
  title: string;
  isAvailable: boolean;
  url: string;
  imageUrl?: string;
};

export function UpdatesPage() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [isLoadingUpdates, setIsLoadingUpdates] = useState(true);
  const [updatesError, setUpdatesError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setIsLoadingUpdates(true);
        setUpdatesError(null);

        const response = await fetch("/api/updates");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch updates");
        }

        const updates = data.updates || [];
        
        // Sort updates by date (newest to oldest)
        // Handles various date formats: DD/MM/YYYY, YYYY-MM-DD, etc.
        const sortedUpdates = updates.sort((a: UpdateItem, b: UpdateItem) => {
          const parseDate = (dateStr: string): Date => {
            // Try DD/MM/YYYY format first
            if (dateStr.includes("/")) {
              const parts = dateStr.split("/");
              if (parts.length === 3) {
                // DD/MM/YYYY
                return new Date(
                  parseInt(parts[2]),
                  parseInt(parts[1]) - 1,
                  parseInt(parts[0])
                );
              }
            }
            // Try YYYY-MM-DD format
            if (dateStr.includes("-")) {
              return new Date(dateStr);
            }
            // Fallback to Date constructor
            return new Date(dateStr);
          };

          const dateA = parseDate(a.date);
          const dateB = parseDate(b.date);
          
          // Sort descending (newest first)
          return dateB.getTime() - dateA.getTime();
        });

        setUpdates(sortedUpdates);
      } catch (err) {
        setUpdatesError(err instanceof Error ? err.message : "Failed to load updates");
      } finally {
        setIsLoadingUpdates(false);
      }
    };

    fetchUpdates();
  }, []);

  const validateEmail = (email: string): string | null => {
    if (!email || email.trim() === "") {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Client-side validation
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/join-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to subscribe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
        <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />

        <div className="flex flex-1 flex-col gap-16">
          <div className="flex flex-col gap-10">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm uppercase tracking-[0.2rem] text-white/60 transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              <span className="text-lg leading-none">←</span>
              Back
            </Link>

            <div className="flex flex-col gap-6">
              <h1
                className="text-3xl uppercase tracking-[0.4rem]"
                style={{ fontFamily: "var(--font-karantina)" }}
              >
                Updates
              </h1>

              <div
                className="flex flex-col items-center gap-4 text-center md:gap-8 pb-10"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                <h3 className="text-lg uppercase tracking-[0.3rem] text-white md:text-lg">
                  Join Us
                </h3>

                <form
                  onSubmit={handleSubmit}
                  className="flex w-full max-w-md flex-col gap-3"
                >
                  <div className="flex items-center gap-3 border-b border-white pb-2 px-2 text-xs uppercase tracking-[0.1rem] text-white md:text-base">
                    <label className="flex-1">
                      <span className="sr-only">Email</span>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required
                        className="w-full bg-transparent text-white outline-none disabled:opacity-50"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="text-lg transition-opacity hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Submit email"
                    >
                      {isLoading ? "..." : "→"}
                    </button>
                  </div>
                  {error && (
                    <p className="text-xs uppercase tracking-[0.1rem] text-red-400">
                      {error}
                    </p>
                  )}
                  {success && (
                    <p className="text-xs uppercase tracking-[0.1rem] text-green-400">
                      Successfully subscribed!
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="grid flex-1 gap-12 md:grid-cols-2">
            {isLoadingUpdates ? (
              <div
                className="col-span-2 text-center text-sm text-white/60"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                Loading updates...
              </div>
            ) : updatesError ? (
              <div
                className="col-span-2 text-center text-sm text-red-400"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                {updatesError}
              </div>
            ) : updates.length === 0 ? (
              <div
                className="col-span-2 text-center text-sm text-white/60"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                No updates available.
              </div>
            ) : (
              updates.map((update) => {
                const isEnded = !update.isAvailable;
                const UpdateWrapper = update.url ? Link : "div";
                const wrapperProps = update.url
                  ? { href: update.url, target: "_blank", rel: "noopener noreferrer" }
                  : {};

                return (
                  <article
                    key={update.id}
                    className="flex flex-col gap-4"
                    style={{ fontFamily: "var(--font-league-spartan)" }}
                  >
                    <span className="text-xs uppercase tracking-[0.3rem] text-white/70">
                      {update.date}
                    </span>
                    <UpdateWrapper
                      {...wrapperProps}
                      className={update.url ? "cursor-pointer" : ""}
                    >
                      {update.imageUrl ? (
                        <img
                          src={
                            update.imageUrl.startsWith("data:")
                              ? update.imageUrl
                              : `data:image/jpeg;base64,${update.imageUrl}`
                          }
                          alt={update.title}
                          className={`aspect-[4/3] w-full rounded-sm border object-cover transition-opacity ${
                            isEnded
                              ? "border-white/10 opacity-50"
                              : "border-white/30"
                          } ${update.url ? "hover:opacity-80" : ""}`}
                        />
                      ) : (
                        <div
                          className={`aspect-[4/3] w-full rounded-sm border transition-opacity ${
                            isEnded
                              ? "border-white/10 bg-white/10"
                              : "border-white/30 bg-white/5"
                          } ${update.url ? "hover:opacity-80" : ""}`}
                        />
                      )}
                    </UpdateWrapper>
                    <div className="flex items-center justify-center">
                      {isEnded ? (
                        <div className="relative flex items-center justify-center px-10">
                          <span className="absolute left-0 right-0 h-px bg-white/40" />
                          <span className="bg-black px-4 text-sm uppercase tracking-[0.35rem] text-white/50">
                            {update.title}
                          </span>
                        </div>
                      ) : (
                        <UpdateWrapper
                          {...wrapperProps}
                          className={update.url ? "cursor-pointer transition-opacity hover:opacity-70" : ""}
                        >
                          <span className="text-sm uppercase tracking-[0.35rem] text-white">
                            {update.title}
                          </span>
                        </UpdateWrapper>
                      )}
                    </div>
                  </article>
                );
              })
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


