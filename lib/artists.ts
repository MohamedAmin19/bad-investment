export type ArtistSocialLink = {
  label: string;
  href: string;
};

export type Artist = {
  slug: string;
  name: string;
  title: string;
  bio: string[];
  socials: ArtistSocialLink[];
  imageUrl?: string;
};

export const artists: Artist[] = [
  {
    slug: "lorem-ibesome",
    name: "Lorem Ibesome",
    title: "Vocalist · Producer",
    bio: [
      "Lorem Ibesome crafts cinematic soundscapes that live between bass-heavy futurism and intimate soul.",
      "Their live performances weave processed vocals with hardware improvisation, creating a new narrative every night.",
      "Lorem Ibesome crafts cinematic soundscapes that live between bass-heavy futurism and intimate soul.",
      "Their live performances weave processed vocals with hardware improvisation, creating a new narrative every night.",
      "Lorem Ibesome crafts cinematic soundscapes that live between bass-heavy futurism and intimate soul.",
      "Their live performances weave processed vocals with hardware improvisation, creating a new narrative every night.",
    ],
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Spotify", href: "https://spotify.com" },
      { label: "Apple Music", href: "https://music.apple.com" },
      { label: "YouTube", href: "https://youtube.com" },
    ],
  },
  {
    slug: "nova-aria",
    name: "Nova Aria",
    title: "Composer · Synth Designer",
    bio: [
      "Nova Aria sculpts drifting ambient suites that bloom into late-night crescendos.",
    ],
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Bandcamp", href: "https://bandcamp.com" },
    ],
  },
  {
    slug: "echo-blade",
    name: "Echo Blade",
    title: "DJ · Curator",
    bio: [
      "Echo Blade blends grime percussion with vaporous pads to create kinetic DJ sets.",
    ],
    socials: [
      { label: "Spotify", href: "https://spotify.com" },
      { label: "Apple Music", href: "https://music.apple.com" },
    ],
  },
  {
    slug: "violet-noir",
    name: "Violet Noir",
    title: "Vocalist · Lyricist",
    bio: [
      "Violet Noir weaves noir-pop ballads with razor-wire lyricism.",
    ],
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
    ],
  },
  {
    slug: "atlas-ryder",
    name: "Atlas Ryder",
    title: "Live Electronics",
    bio: [
      "Atlas Ryder bends breakbeats around analog drones for controlled chaos.",
    ],
    socials: [
      { label: "YouTube", href: "https://youtube.com" },
    ],
  },
  {
    slug: "solstice-wave",
    name: "Solstice Wave",
    title: "Producer · Mixing Engineer",
    bio: [
      "Solstice Wave turns field recordings into restless downtempo rhythms.",
    ],
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Spotify", href: "https://spotify.com" },
    ],
  },
  {
    slug: "hollow-echo",
    name: "Hollow Echo",
    title: "Composer",
    bio: [
      "Hollow Echo scores liminal spaces, blurring drone and processed voice.",
    ],
    socials: [
      { label: "Bandcamp", href: "https://bandcamp.com" },
    ],
  },
  {
    slug: "neon-drift",
    name: "Neon Drift",
    title: "Producer · Visual Artist",
    bio: [
      "Neon Drift pairs monochrome visuals with fractured rhythms.",
    ],
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "YouTube", href: "https://youtube.com" },
    ],
  },
  {
    slug: "ember-lux",
    name: "Ember Lux",
    title: "Songwriter",
    bio: [
      "Ember Lux writes with the crystalline detail of folk story-telling.",
    ],
    socials: [
      { label: "Spotify", href: "https://spotify.com" },
    ],
  },
  {
    slug: "static-rose",
    name: "Static Rose",
    title: "Producer · DJ",
    bio: [
      "Static Rose fuses footwork, jungle, and deconstructed pop.",
    ],
    socials: [
      { label: "SoundCloud", href: "https://soundcloud.com" },
    ],
  },
];

export const artistBySlug = Object.fromEntries(
  artists.map((artist) => [artist.slug, artist])
) as Record<string, Artist>;

