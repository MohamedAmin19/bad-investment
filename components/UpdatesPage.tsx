import Link from "next/link";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";

type UpdateStatus = "upcoming" | "ended";

type UpdateItem = {
  id: number;
  date: string;
  title: string;
  status: UpdateStatus;
};

const updates: UpdateItem[] = [
  { id: 1, date: "23/12/2025", title: "Alamain concert", status: "upcoming" },
  { id: 2, date: "23/12/2025", title: "Alamain concert", status: "upcoming" },
  { id: 3, date: "23/12/2025", title: "Alamain concert", status: "upcoming" },
  { id: 4, date: "23/12/2025", title: "Alamain concert", status: "upcoming" },
  { id: 5, date: "23/12/2025", title: "Alamain concert", status: "ended" },
  { id: 6, date: "23/12/2025", title: "Alamain concert", status: "ended" },
];

export function UpdatesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
        <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />

        <div className="flex flex-1 flex-col gap-16">
          <div className="flex flex-col gap-10">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm uppercase tracking-[0.2rem] text-white/60 transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              <span className="text-lg leading-none">←</span>
              Back
            </Link>

            <div className="flex flex-col gap-6">
              <h1
                className="text-3xl uppercase tracking-[0.4rem]"
                style={{ fontFamily: "var(--font-karantina)" }}
              >
                Updates
              </h1>

              <div
                className="flex flex-col items-center gap-4 text-center md:gap-8 pb-10"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                <h3 className="text-lg uppercase tracking-[0.3rem] text-white md:text-lg">
                  Join Us
                </h3>

                <form className="flex w-full max-w-md items-center gap-3 border-b border-white pb-2 px-2 text-xs uppercase tracking-[0.1rem] text-white md:text-base">
                  <label className="flex-1">
                    <span className="sr-only">Email</span>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full bg-transparent text-white outline-none"
                    />
                  </label>
                  <button
                    type="submit"
                    className="text-lg transition-opacity hover:opacity-70"
                    aria-label="Submit email"
                  >
                    →
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="grid flex-1 gap-12 md:grid-cols-2">
            {updates.map((update) => {
              const isEnded = update.status === "ended";
              return (
                <article
                  key={update.id}
                  className="flex flex-col gap-4"
                  style={{ fontFamily: "var(--font-league-spartan)" }}
                >
                  <span className="text-xs uppercase tracking-[0.3rem] text-white/70">
                    {update.date}
                  </span>
                  <div
                    className={`aspect-[4/3] w-full rounded-sm border ${
                      isEnded
                        ? "border-white/10 bg-white/10"
                        : "border-white/30 bg-white/5"
                    }`}
                  />
                  <div className="flex items-center justify-center">
                    {isEnded ? (
                      <div className="relative flex items-center justify-center px-10">
                        <span className="absolute left-0 right-0 h-px bg-white/40" />
                        <span className="bg-black px-4 text-sm uppercase tracking-[0.35rem] text-white/50">
                          {update.title}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm uppercase tracking-[0.35rem] text-white">
                        {update.title}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
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


