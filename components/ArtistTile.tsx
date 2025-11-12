import Link from "next/link";
import type { CSSProperties } from "react";

import type { Artist } from "@/lib/artists";

type ArtistTileProps = {
  artist: Artist;
  className?: string;
  style?: CSSProperties;
};

export function ArtistTile({ artist, className = "", style }: ArtistTileProps) {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      aria-label={`View ${artist.name}`}
      className={`group relative block overflow-hidden bg-white text-black transition-opacity hover:opacity-80 focus-visible:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
      style={style}
    >
      <span
        className="pointer-events-none absolute inset-4 flex items-end text-[0.65rem] uppercase tracking-[0.25rem] text-black/60 transition-opacity group-hover:text-black/80"
        style={{ fontFamily: "var(--font-league-spartan)" }}
      >
        {artist.name}
      </span>
    </Link>
  );
}

