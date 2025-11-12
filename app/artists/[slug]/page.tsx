import { notFound } from "next/navigation";

import { ArtistProfile } from "@/components/ArtistProfile";
import { artistBySlug, artists } from "@/lib/artists";

type ArtistPageProps = {
  params: { slug: string };
};

const fallbackSlug = "lorem-ibesome";

export default function ArtistPage({ params }: ArtistPageProps) {
  const artist = artistBySlug[params.slug] ?? artistBySlug[fallbackSlug];

  if (!artist) {
    notFound();
  }

  return <ArtistProfile artist={artist} />;
}

export function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

