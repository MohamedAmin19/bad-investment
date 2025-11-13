"use client";

import { useMemo, useState, FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";

type SubmitRole = "business" | "artist";

const formFields: { id: string; label: string; type: "text" | "email" }[] = [
  { id: "name", label: "Name", type: "text" },
  { id: "phone", label: "Phone number", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "artist", label: "Artist or Band name", type: "text" },
  { id: "profile", label: "Music profile", type: "text" },
];

const roleLabels: Record<SubmitRole, string> = {
  business: "Business manager",
  artist: "Artist",
};

function useInitialRole(): SubmitRole {
  const params = useSearchParams();
  const roleParam = params.get("role");
  return useMemo(() => {
    if (roleParam === "artist") {
      return "artist";
    }
    return "business";
  }, [roleParam]);
}

function useInitialSubmissionType(): "individual" | "company" {
  const params = useSearchParams();
  const typeParam = params.get("type");
  return useMemo(() => {
    if (typeParam === "individual") {
      return "individual";
    }
    return "company";
  }, [typeParam]);
}

export function SubmitDetailsPage() {
  const initialRole = useInitialRole();
  const initialSubmissionType = useInitialSubmissionType();
  const [selectedRole, setSelectedRole] = useState<SubmitRole>(initialRole);
  const [submissionType, setSubmissionType] = useState<"individual" | "company">(initialSubmissionType);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    artist: "",
    profile: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateForm = (): string | null => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();

    // Name validation
    if (!trimmedName) {
      return "Name is required";
    }
    if (trimmedName.length < 2) {
      return "Name must be at least 2 characters";
    }
    if (trimmedName.length > 100) {
      return "Name must be less than 100 characters";
    }

    // Email validation
    if (!trimmedEmail) {
      return "Email is required";
    }
    if (trimmedEmail.length > 254) {
      return "Email must be less than 254 characters";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return "Invalid email format";
    }
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!strictEmailRegex.test(trimmedEmail)) {
      return "Please enter a valid email address";
    }

    // Phone validation (optional but validate if provided)
    if (trimmedPhone) {
      const phoneDigits = trimmedPhone.replace(/[\s\-\(\)\+]/g, "");
      if (!/^\d+$/.test(phoneDigits)) {
        return "Phone number can only contain digits, spaces, hyphens, parentheses, and +";
      }
      if (phoneDigits.length < 7) {
        return "Phone number must be at least 7 digits";
      }
      if (phoneDigits.length > 15) {
        return "Phone number must be less than 15 digits";
      }
    }

    // Artist validation (optional but validate if provided)
    if (formData.artist && formData.artist.trim().length > 200) {
      return "Artist/Band name must be less than 200 characters";
    }

    // Profile validation (optional but validate if provided)
    if (formData.profile && formData.profile.trim().length > 5000) {
      return "Music profile must be less than 5000 characters";
    }

    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Client-side validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: selectedRole,
          submissionType: submissionType,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        artist: "",
        profile: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
        <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />

        <div className="flex flex-1 flex-col gap-28">
          <div className="flex flex-col gap-8">
            <Link
              href="/submit"
              className="flex items-center gap-3 text-sm uppercase tracking-[0.2rem] text-white/60 transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              <span className="text-lg leading-none">←</span>
              Back
            </Link>

            <h1
              className="text-3xl uppercase tracking-[0.4rem]"
              style={{ fontFamily: "var(--font-karantina)" }}
            >
              Submit your music
            </h1>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-20">
            <div
              className="flex flex-col items-center gap-6 md:flex-row md:items-center"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              {(Object.keys(roleLabels) as SubmitRole[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setSelectedRole(role);
                    // Update submission type based on role selection
                    if (role === "artist") {
                      setSubmissionType("individual");
                    } else {
                      setSubmissionType("company");
                    }
                  }}
                  className={`min-w-[300px] rounded-xl border border-white px-12 py-2 text-xl tracking-[0.35rem] transition-colors duration-200 ${
                    selectedRole === role
                      ? "bg-[#d9d9d9] text-black"
                      : "text-white hover:bg-[#d9d9d9] hover:text-black"
                  }`}
                >
                  {roleLabels[role]}
                </button>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-3xl flex-col gap-8"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              {formFields.slice(0, -1).map((field) => (
                <label key={field.id} className="flex flex-col gap-3">
                  <span className="text-sm uppercase tracking-[0.3rem] text-white/80">
                    {field.label}
                  </span>
                  <input
                    id={`${selectedRole}-${field.id}`}
                    name={field.id}
                    type={field.type}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                    required={field.id === "name" || field.id === "email"}
                    disabled={isLoading}
                    className="border-b border-white/30 bg-transparent pb-3 text-base text-white outline-none transition-colors focus:border-white disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </label>
              ))}

              <label className="flex flex-col gap-3">
                <span className="text-sm uppercase tracking-[0.3rem] text-white/80">
                  Music profile
                </span>
                <textarea
                  id={`${selectedRole}-profile`}
                  name="profile"
                  rows={4}
                  value={formData.profile}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="resize-none border-b border-white/30 bg-transparent pb-3 text-base text-white outline-none transition-colors focus:border-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </label>

              {error && (
                <div className="text-sm uppercase tracking-[0.1rem] text-red-400">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-sm uppercase tracking-[0.1rem] text-green-400">
                  Thank you! Your music submission has been received successfully.
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-sm bg-white/20 px-8 py-2 text-sm uppercase tracking-[0.3rem] text-white transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
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


