"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";

export function SubmitMusicPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
        <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />

        <div className="flex flex-1 flex-col gap-20">
          <div className="flex flex-col gap-8">
            <Link
              href="/"
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
              <button
                type="button"
                onClick={() => router.push("/submit/details?type=individual&role=artist")}
                className="min-w-[300px] rounded-xl border border-white px-12 py-2 text-xl tracking-[0.35rem] text-white transition-colors duration-200 hover:bg-[#d9d9d9] hover:text-black"
              >
                Individual
              </button>
              <button
                type="button"
                onClick={() => router.push("/submit/details?type=company&role=business")}
                className="min-w-[300px] rounded-xl border border-white px-12 py-2 text-xl tracking-[0.35rem] text-white transition-colors duration-200 hover:bg-[#d9d9d9] hover:text-black"
              >
                Company
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 pb-10 pt-10 md:px-10">
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


