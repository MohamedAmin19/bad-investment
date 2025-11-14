import Link from "next/link";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import type { Artist } from "@/lib/artists";
import { socialLinks } from "@/lib/socialLinks";

type ArtistProfileProps = {
  artist: Artist;
};

export function ArtistProfile({ artist }: ArtistProfileProps) {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
        <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />

        <div className="flex flex-1 flex-col gap-16">
          <div className="flex flex-col gap-8">
            <Link
              href="/artists"
              className="flex items-center gap-4 text-sm uppercase tracking-[0.2rem] text-white/60 transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              <span className="text-lg leading-none">←</span>
              Back
            </Link>

            <div className="flex flex-col gap-2">
              <h1
                className="text-3xl uppercase tracking-[0.4rem]"
                style={{ fontFamily: "var(--font-karantina)" }}
              >
                {artist.name}
              </h1>
              <p
                className="text-sm uppercase tracking-[0.3rem] text-white/60"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                {artist.title}
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
            <div
              className="relative w-full max-w-[775px] bg-white/10"
              style={{ aspectRatio: "775 / 1106" }}
            >
              {artist.imageUrl ? (
                <img
                  src={
                    artist.imageUrl.startsWith("data:")
                      ? artist.imageUrl
                      : `data:image/jpeg;base64,${artist.imageUrl}`
                  }
                  alt={artist.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm uppercase tracking-[0.3rem] text-white/40">
                  Artist Visual
                </span>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div
                className="space-y-4 text-sm leading-relaxed text-white/70"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                {artist.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {artist.socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="group flex items-center justify-between border-b border-white/20 px-6 py-4 text-sm uppercase tracking-[0.25rem] text-white transition-opacity hover:bg-white hover:text-black"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                {social.label}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
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

