"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";
import { useCart } from "@/contexts/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch product");
        }

        setProduct(data.product);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    setIsAddingToCart(true);
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images && product.images.length > 0 ? product.images[0] : "",
      },
      quantity
    );
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 99) return; // Max 99 items
    setQuantity(newQuantity);
  };

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

  const nextImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div
          className="text-sm uppercase tracking-[0.3rem] text-white/60"
          style={{ fontFamily: "var(--font-league-spartan)" }}
        >
          Loading product...
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen flex-col bg-black text-white">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
          <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />
          <div
            className="text-center text-sm text-red-400"
            style={{ fontFamily: "var(--font-league-spartan)" }}
          >
            {error || "Product not found"}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
        <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />

        <div className="flex flex-1 flex-col gap-16">
          <div className="flex flex-col gap-8">
            <Link
              href="/store"
              className="flex items-center gap-3 text-sm uppercase tracking-[0.2rem] text-white/60 transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              <span className="text-lg leading-none">←</span>
              Back to Store
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image Slider */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-white/20 bg-white/5">
                {product.images && product.images.length > 0 ? (
                  <>
                    <img
                      src={getImageSrc(product.images[currentImageIndex])}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-opacity hover:bg-black/70"
                          aria-label="Previous image"
                        >
                          ←
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-opacity hover:bg-black/70"
                          aria-label="Next image"
                        >
                          →
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {product.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`h-2 w-2 rounded-full transition-opacity ${
                                index === currentImageIndex
                                  ? "bg-white"
                                  : "bg-white/40"
                              }`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/40">
                    No Image
                  </div>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border transition-opacity ${
                        index === currentImageIndex
                          ? "border-white"
                          : "border-white/30 opacity-60"
                      }`}
                    >
                      <img
                        src={getImageSrc(image)}
                        alt={`${product.name} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h1
                  className="text-3xl uppercase tracking-[0.4rem]"
                  style={{ fontFamily: "var(--font-karantina)" }}
                >
                  {product.name}
                </h1>
                <p
                  className="text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-league-spartan)" }}
                >
                  {formatPrice(product.price)}
                </p>
              </div>

              <div
                className="space-y-4 text-sm leading-relaxed text-white/70"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                <p>{product.description}</p>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <label
                    className="text-sm uppercase tracking-[0.2rem] text-white/80"
                    style={{ fontFamily: "var(--font-league-spartan)" }}
                  >
                    Quantity:
                  </label>
                  <div className="flex items-center gap-2 border border-white/20">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="px-3 py-2 text-white transition-opacity hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        handleQuantityChange(value);
                      }}
                      className="w-16 border-0 bg-transparent py-2 text-center text-white outline-none"
                      style={{ fontFamily: "var(--font-league-spartan)" }}
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= 99}
                      className="px-3 py-2 text-white transition-opacity hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="rounded-sm bg-white/20 px-8 py-3 text-sm uppercase tracking-[0.3rem] text-white transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-league-spartan)" }}
                >
                  {isAddingToCart ? "Adding..." : `Add ${quantity} to Cart`}
                </button>
              </div>
            </div>
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

