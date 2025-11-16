"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

type NavItem = {
  label: string;
  href: string;
};

type HeaderNavProps = {
  brand: string;
  menuItems: NavItem[];
  className?: string;
};

export function HeaderNav({ brand, menuItems, className }: HeaderNavProps) {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <header
      className={`flex items-center justify-between gap-6 text-white ${
        className ?? ""
      }`}
    >
      <Link
        href="/"
        className="text-3xl uppercase tracking-[0.5rem]"
        style={{ fontFamily: "var(--font-karantina)" }}
      >
        {brand}
      </Link>
      <nav
        className="flex items-center gap-6 text-base"
        style={{ fontFamily: "var(--font-league-spartan)" }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="transition-opacity hover:opacity-70"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/store/checkout"
          className="relative transition-opacity hover:opacity-70"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
              {cartItemCount > 9 ? "9+" : cartItemCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}


