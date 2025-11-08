import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type FooterNavLink = {
  label: string;
  href: string;
  isPrimary?: boolean;
};

type FooterSocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type SiteFooterProps = {
  brand: string;
  navLinks: FooterNavLink[];
  socialLinks: FooterSocialLink[];
  legalLinks: FooterNavLink[];
  className?: string;
};

export function SiteFooter({
  brand,
  navLinks,
  socialLinks,
  legalLinks,
  className,
}: SiteFooterProps) {
  return (
    <footer
      className={`relative z-10 flex w-full flex-col gap-10 pb-12 text-white ${
        className ?? ""
      }`}
    >
      <div className="flex flex-col gap-6">
        <span
          className="text-3xl uppercase tracking-[0.5rem]"
          style={{ fontFamily: "var(--font-karantina)" }}
        >
          {brand}
        </span>

        <div className="grid gap-4 sm:grid-cols-5 sm:items-center">
          <nav
            className="flex items-center gap-8 text-base"
            style={{ fontFamily: "var(--font-league-spartan)" }}
          >
            {navLinks.map(({ label, href, isPrimary }) => (
              <Link
                key={label}
                href={href}
                className={`transition-opacity hover:opacity-70 ${
                  isPrimary ? "font-semibold" : "font-light text-white/80"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:justify-end">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="transition-opacity hover:opacity-70"
                aria-label={label}
              >
                <Icon strokeWidth={1.5} className="h-5 w-5 sm:h-4 sm:w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-8 text-sm text-white/60"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {legalLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="transition-opacity hover:opacity-70"
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}


