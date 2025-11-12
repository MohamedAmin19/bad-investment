import Link from "next/link";

import { ArtistTile } from "@/components/ArtistTile";
import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { artistBySlug } from "@/lib/artists";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";

const leftColumnOrder = [
  "lorem-ibesome",
  "nova-aria",
  "echo-blade",
  "violet-noir",
  "atlas-ryder",
] as const;

const rightColumnOrder = [
  "solstice-wave",
  "hollow-echo",
  "neon-drift",
  "ember-lux",
  "static-rose",
] as const;

export function ArtistsPage() {
  const featuredArtists = [
    ...leftColumnOrder,
    ...rightColumnOrder,
  ] as string[];
  const missingArtists = featuredArtists.filter((slug) => !artistBySlug[slug]);

  if (missingArtists.length > 0) {
    throw new Error(
      `Artist configuration is missing entries for: ${missingArtists.join(", ")}`
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
        <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />

        <div className="flex flex-1 flex-col gap-16">
          <div className="flex flex-col gap-8">
            <Link
              href="/"
              className="flex items-center gap-4 text-sm uppercase tracking-[0.2rem] text-white/60 transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              <span className="text-lg leading-none">←</span>
              Back
            </Link>

            <h1
              className="text-3xl uppercase tracking-[0.4rem]"
              style={{ fontFamily: "var(--font-karantina)" }}
            >
              Artists
            </h1>
          </div>

          <div className="flex flex-1 justify-center">
            <div className="grid w-full max-w-4xl grid-cols-[1.25fr_1fr] gap-4 bg-black p-6">
              <div className="flex flex-col gap-4">
                <ArtistTile
                  artist={artistBySlug[leftColumnOrder[0]]}
                  className="aspect-square w-full min-h-[420px] bg-white/85"
                />
                <div className="grid grid-cols-2 gap-4">
                  <ArtistTile
                    artist={artistBySlug[leftColumnOrder[1]]}
                    className="w-full max-w-[374px] bg-white"
                    style={{ aspectRatio: "374 / 383" }}
                  />
                  <ArtistTile
                    artist={artistBySlug[leftColumnOrder[2]]}
                    className="aspect-square bg-white"
                  />
                </div>
                <ArtistTile
                  artist={artistBySlug[leftColumnOrder[3]]}
                  className="w-full max-w-[775px] bg-white"
                  style={{ aspectRatio: "775 / 375" }}
                />
                <ArtistTile
                  artist={artistBySlug[leftColumnOrder[4]]}
                  className="aspect-square w-full min-h-[420px] bg-white/85"
                />
              </div>

              <div className="flex flex-col gap-4">
                <ArtistTile
                  artist={artistBySlug[rightColumnOrder[0]]}
                  className="w-full max-w-[775px] bg-white"
                  style={{ aspectRatio: "775 / 375" }}
                />
                <ArtistTile
                  artist={artistBySlug[rightColumnOrder[1]]}
                  className="aspect-square w-full min-h-[420px] bg-white/85"
                />
                <ArtistTile
                  artist={artistBySlug[rightColumnOrder[2]]}
                  className="aspect-square w-full min-h-[420px] bg-white/85"
                />
                <div className="grid grid-cols-2 gap-4">
                  <ArtistTile
                    artist={artistBySlug[rightColumnOrder[3]]}
                    className="aspect-square bg-white"
                  />
                  <ArtistTile
                    artist={artistBySlug[rightColumnOrder[4]]}
                    className="aspect-square bg-white"
                  />
                </div>
              </div>
            </div>
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



