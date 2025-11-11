"use client";

import { useMemo, useState } from "react";
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

export function SubmitDetailsPage() {
  const initialRole = useInitialRole();
  const [selectedRole, setSelectedRole] = useState<SubmitRole>(initialRole);

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
                  onClick={() => setSelectedRole(role)}
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
                    className="border-b border-white/30 bg-transparent pb-3 text-base text-white outline-none transition-colors focus:border-white"
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
                  rows={1}
                  className="resize-none border-b border-white/30 bg-transparent pb-3 text-base text-white outline-none transition-colors focus:border-white"
                />
              </label>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="rounded-sm bg-white/20 px-8 py-2 text-sm uppercase tracking-[0.3rem] text-white transition-opacity hover:opacity-80"
                >
                  Submit
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


