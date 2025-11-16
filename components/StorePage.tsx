"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
};

export function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/products");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch products");
        }

        setProducts(data.products || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
    }).format(price);
  };

  const getImageSrc = (imageUrl: string) => {
    if (imageUrl.startsWith("data:")) {
      return imageUrl;
    }
    return `data:image/jpeg;base64,${imageUrl}`;
  };

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
        <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />

        <div className="flex flex-1 flex-col gap-16">
          <div className="flex flex-col gap-8">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm uppercase tracking-[0.2rem] text-white/60 transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              <span className="text-lg leading-none">←</span>
              Back
            </Link>

            <h1
              className="text-3xl uppercase tracking-[0.4rem]"
              style={{ fontFamily: "var(--font-karantina)" }}
            >
              Store
            </h1>
          </div>

          {isLoading ? (
            <div
              className="text-center text-sm text-white/60"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              Loading products...
            </div>
          ) : error ? (
            <div
              className="text-center text-sm text-red-400"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              {error}
            </div>
          ) : products.length === 0 ? (
            <div
              className="text-center text-sm text-white/60"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              No products available.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/store/${product.id}`}
                  className="group flex flex-col gap-4 transition-opacity hover:opacity-80"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-white/20 bg-white/5">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={getImageSrc(product.images[0])}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-white/40">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-lg uppercase tracking-[0.2rem] text-white"
                      style={{ fontFamily: "var(--font-league-spartan)" }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-sm text-white/70 line-clamp-2"
                      style={{ fontFamily: "var(--font-league-spartan)" }}
                    >
                      {product.description}
                    </p>
                    <p
                      className="text-base font-semibold text-white"
                      style={{ fontFamily: "var(--font-league-spartan)" }}
                    >
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
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

