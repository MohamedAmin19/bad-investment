"use client";

import Link from "next/link";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
        <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />

        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="text-6xl">✓</div>
            <h1
              className="text-3xl uppercase tracking-[0.4rem]"
              style={{ fontFamily: "var(--font-karantina)" }}
            >
              Order Confirmed
            </h1>
            <p
              className="max-w-md text-sm text-white/70"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              Thank you for your purchase! Your order has been received and will be processed shortly.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/store"
              className="rounded-sm bg-white/20 px-8 py-2 text-sm uppercase tracking-[0.3rem] text-white transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="rounded-sm border border-white/20 px-8 py-2 text-sm uppercase tracking-[0.3rem] text-white transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              Go Home
            </Link>
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

