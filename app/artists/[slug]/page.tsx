"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";

import { ArtistProfile } from "@/components/ArtistProfile";
import type { Artist } from "@/lib/artists";

export default function ArtistPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/artists/${slug}`);
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 404) {
            notFound();
            return;
          }
          throw new Error(data.error || "Failed to fetch artist");
        }

        setArtist(data.artist);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load artist");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtist();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div
          className="text-sm uppercase tracking-[0.3rem] text-white/60"
          style={{ fontFamily: "var(--font-league-spartan)" }}
        >
          Loading artist...
        </div>
      </div>
    );
  }

  if (error || !artist) {
    notFound();
    return null;
  }

  return <ArtistProfile artist={artist} />;
}

