import Link from "next/link";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";

type TourStop = {
  date: string;
  city: string;
  venue: string;
  ticketsUrl: string;
};

const tourStops: TourStop[] = [
  {
    date: "12/11/2025",
    city: "Cairo",
    venue: "Cairo Stadium",
    ticketsUrl: "#",
  },
  {
    date: "01/18/2026",
    city: "Alexandria",
    venue: "Mediterranean Arena",
    ticketsUrl: "#",
  },
  {
    date: "02/02/2026",
    city: "Marrakesh",
    venue: "Atlas Pavilion",
    ticketsUrl: "#",
  },
  {
    date: "02/27/2026",
    city: "Casablanca",
    venue: "Atlantic Dome",
    ticketsUrl: "#",
  },
  {
    date: "03/15/2026",
    city: "Dubai",
    venue: "Desert Soundstage",
    ticketsUrl: "#",
  },
  {
    date: "04/09/2026",
    city: "Doha",
    venue: "Pearl Amphitheatre",
    ticketsUrl: "#",
  },
];

export function TourPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
        <HeaderNav
          brand="BADINVSTMNT"
          menuItems={mainMenuItems}
          className="text-sm"
        />

        <div className="flex flex-col gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm uppercase tracking-[0.2rem] text-white/60 transition-opacity hover:opacity-70"
            style={{ fontFamily: "var(--font-league-spartan)" }}
          >
            <span className="text-lg leading-none">←</span>
            Back
          </Link>

          <h1
            className="text-3xl uppercase tracking-[0.6rem] md:text-4xl"
            style={{ fontFamily: "var(--font-karantina)" }}
          >
            Tour
          </h1>
        </div>

        <section className="flex flex-col gap-12 md:gap-16">
          <div className="aspect-[16/9] w-full rounded-sm  bg-white/10" />

          <div className="overflow-hidden rounded-sm divide-y divide-white/10">
            <div
              className="flex gap-12 px-6 py-4 text-xs uppercase tracking-[0.25rem] text-white/60 md:px-8 md:text-sm"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              <span className="flex-1">Date</span>
              <span className="flex-1">City</span>
              <span className="flex-1">Venue</span>
              <span className="w-24 text-right">Tickets</span>
            </div>

            <div className="divide-y divide-white/10">
              {tourStops.map((stop) => (
                <div
                  key={`${stop.date}-${stop.city}-${stop.venue}`}
                  className="flex items-center gap-12 px-6 py-3 text-sm md:px-8 md:py-4 md:text-xs"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  <span className="flex-1 text-white/80">{stop.date}</span>
                  <span className="flex-1 text-white/70">{stop.city}</span>
                  <span className="flex-1 text-white/70">{stop.venue}</span>
                  <Link
                    href={stop.ticketsUrl}
                    className="w-20 text-right text-sm uppercase tracking-[0.25rem] text-white transition-opacity hover:opacity-70 md:text-xs"
                    style={{ fontFamily: "var(--font-league-spartan)" }}
                  >
                    Tickets
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-10 md:px-10">
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


