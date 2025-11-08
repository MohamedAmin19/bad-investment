import Link from "next/link";
import { ArrowLeft, Mail, Smartphone } from "lucide-react";
import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";

const footerNavLinks = [
  { label: "Company", href: "#company", isPrimary: true },
  { label: "FAQ", href: "#faq", isPrimary: true },
];

const footerLegalLinks = [
  { label: "Terms of service", href: "#terms" },
  { label: "Privacy & cookie policy", href: "#privacy" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-10 md:px-10">
        <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />

        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white transition-opacity hover:opacity-70"
            style={{ fontFamily: "var(--font-league-spartan)" }}
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Link>

          <h1
            className="text-3xl uppercase tracking-[0.4rem]"
            style={{ fontFamily: "var(--font-karantina)" }}
          >
            Contact
          </h1>
        </div>

        <form
          className="space-y-10"
          style={{ fontFamily: "var(--font-league-spartan)" }}
        >
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "phone", label: "Phone number", type: "tel" },
            { id: "email", label: "Email", type: "email" },
          ].map((field) => (
            <label key={field.id} className="block">
              <span className="mb-3 block text-sm uppercase tracking-[0.3rem] text-white/80">
                {field.label}
              </span>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                className="w-full border-b border-white/20 bg-transparent pb-3 text-base focus:border-white focus:outline-none"
              />
            </label>
          ))}

          <label className="block">
            <span className="mb-3 block text-sm uppercase tracking-[0.3rem] text-white/80">
              Comment
            </span>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              className="w-full border-b border-white/20 bg-transparent pb-3 text-base focus:border-white focus:outline-none"
            />
          </label>

          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-sm bg-white/20 px-8 py-2 text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-80"
            >
              Submit
            </button>
          </div>
        </form>

        <div
          className="space-y-8"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          <div>
            <h2
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              Get in touch
            </h2>
            <p className="mt-3 max-w-sm text-sm text-white/70">
              We would love to hear from you - please use the form to send us
              your message.
            </p>
          </div>

          <div className="space-y-4 text-white/80">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <span className="text-sm">hello@badinvstmnt.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 pb-10 md:px-10">
        <SiteFooter
          brand="BADINVSTMNT"
          navLinks={footerNavLinks}
          socialLinks={socialLinks}
          legalLinks={footerLegalLinks}
        />
      </div>
    </main>
  );
}


