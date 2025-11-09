import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type HomeFooterProps = {
  socialLinks: SocialLink[];
};

export function HomeFooter({ socialLinks }: HomeFooterProps) {
  return (
    <footer className="relative z-10 flex h-[28px] w-[324px] items-center justify-between self-start pb-10 pl-15">
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className="transition-opacity hover:opacity-60"
          aria-label={label}
        >
          <Icon strokeWidth={1.5} className="h-6 w-6" />
        </Link>
      ))}
    </footer>
  );
}


