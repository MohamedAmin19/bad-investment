"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { ArtistTile } from "@/components/ArtistTile";
import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import type { Artist } from "@/lib/artists";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";

export function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/artists");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch artists");
        }

        setArtists(data.artists || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load artists");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Create artist lookup by slug
  const artistBySlug = artists.reduce((acc, artist) => {
    acc[artist.slug] = artist;
    return acc;
  }, {} as Record<string, Artist>);

  // Split artists into two columns (first half left, second half right)
  const leftColumnArtists = artists.slice(0, Math.ceil(artists.length / 2));
  const rightColumnArtists = artists.slice(Math.ceil(artists.length / 2));

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
            {isLoading ? (
              <div
                className="text-center text-sm text-white/60"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                Loading artists...
              </div>
            ) : error ? (
              <div
                className="text-center text-sm text-red-400"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                {error}
              </div>
            ) : artists.length === 0 ? (
              <div
                className="text-center text-sm text-white/60"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                No artists found.
              </div>
            ) : (
              <div className="grid w-full max-w-4xl grid-cols-[1.25fr_1fr] gap-4 bg-black p-6">
                <div className="flex flex-col gap-4">
                  {leftColumnArtists.map((artist, index) => {
                    if (index === 0) {
                      return (
                        <ArtistTile
                          key={artist.slug}
                          artist={artist}
                          className="aspect-square w-full min-h-[420px] bg-white/85"
                        />
                      );
                    } else if (index === 1) {
                      return (
                        <div key={artist.slug} className="grid grid-cols-2 gap-4">
                          <ArtistTile
                            artist={artist}
                            className="w-full max-w-[374px] bg-white"
                            style={{ aspectRatio: "374 / 383" }}
                          />
                          {leftColumnArtists[2] && (
                            <ArtistTile
                              artist={leftColumnArtists[2]}
                              className="aspect-square bg-white"
                            />
                          )}
                        </div>
                      );
                    } else if (index === 3) {
                      return (
                        <ArtistTile
                          key={artist.slug}
                          artist={artist}
                          className="w-full max-w-[775px] bg-white"
                          style={{ aspectRatio: "775 / 375" }}
                        />
                      );
                    } else if (index === 4) {
                      return (
                        <ArtistTile
                          key={artist.slug}
                          artist={artist}
                          className="aspect-square w-full min-h-[420px] bg-white/85"
                        />
                      );
                    } else if (index > 4) {
                      return (
                        <ArtistTile
                          key={artist.slug}
                          artist={artist}
                          className="aspect-square bg-white"
                        />
                      );
                    }
                    return null;
                  })}
                </div>

                <div className="flex flex-col gap-4">
                  {rightColumnArtists.map((artist, index) => {
                    if (index === 0) {
                      return (
                        <ArtistTile
                          key={artist.slug}
                          artist={artist}
                          className="w-full max-w-[775px] bg-white"
                          style={{ aspectRatio: "775 / 375" }}
                        />
                      );
                    } else if (index === 1 || index === 2) {
                      return (
                        <ArtistTile
                          key={artist.slug}
                          artist={artist}
                          className="aspect-square w-full min-h-[420px] bg-white/85"
                        />
                      );
                    } else if (index >= 3) {
                      if (index === 3) {
                        return (
                          <div key={artist.slug} className="grid grid-cols-2 gap-4">
                            <ArtistTile
                              artist={artist}
                              className="aspect-square bg-white"
                            />
                            {rightColumnArtists[4] && (
                              <ArtistTile
                                artist={rightColumnArtists[4]}
                                className="aspect-square bg-white"
                              />
                            )}
                          </div>
                        );
                      }
                      return null;
                    }
                    return (
                      <ArtistTile
                        key={artist.slug}
                        artist={artist}
                        className="aspect-square bg-white"
                      />
                    );
                  })}
                </div>
              </div>
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



