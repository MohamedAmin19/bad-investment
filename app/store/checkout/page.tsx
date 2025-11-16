"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getImageSrc = (imageUrl: string) => {
    if (imageUrl.startsWith("data:")) {
      return imageUrl;
    }
    return `data:image/jpeg;base64,${imageUrl}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Prepare order data
      const orderData = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
        },
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total: getTotalPrice(),
      };

      // Submit order to API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process order");
      }

      // Clear cart and redirect to success page
      clearCart();
      router.push("/store/checkout/success");
    } catch (error) {
      console.error("Error processing order:", error);
      setError(error instanceof Error ? error.message : "Failed to process order. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen flex-col bg-black text-white">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-14">
          <HeaderNav brand="BADINVSTMNT" menuItems={mainMenuItems} />
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <p
              className="text-lg text-white/70"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              Your cart is empty
            </p>
            <Link
              href="/store"
              className="rounded-sm bg-white/20 px-8 py-2 text-sm uppercase tracking-[0.3rem] text-white transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              Continue Shopping
            </Link>
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

            <h1
              className="text-3xl uppercase tracking-[0.4rem]"
              style={{ fontFamily: "var(--font-karantina)" }}
            >
              Checkout
            </h1>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            {/* Checkout Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              <div className="flex flex-col gap-6">
                <h2
                  className="text-xl uppercase tracking-[0.3rem]"
                  style={{ fontFamily: "var(--font-league-spartan)" }}
                >
                  Shipping Information
                </h2>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-b border-white/20 bg-transparent pb-3 text-base text-white outline-none focus:border-white"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-b border-white/20 bg-transparent pb-3 text-base text-white outline-none focus:border-white"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border-b border-white/20 bg-transparent pb-3 text-base text-white outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="border-b border-white/20 bg-transparent pb-3 text-base text-white outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="border-b border-white/20 bg-transparent pb-3 text-base text-white outline-none focus:border-white"
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm uppercase tracking-[0.1rem] text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="rounded-sm bg-white/20 px-8 py-3 text-sm uppercase tracking-[0.3rem] text-white transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </button>
            </form>

            {/* Order Summary */}
            <div className="flex flex-col gap-6">
              <h2
                className="text-xl uppercase tracking-[0.3rem]"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                Order Summary
              </h2>
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b border-white/10 pb-4"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm border border-white/20">
                      {item.image ? (
                        <img
                          src={getImageSrc(item.image)}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-white/5 text-xs text-white/40">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-sm text-white">{item.name}</p>
                      <p className="text-xs text-white/60">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 text-white/60 hover:text-white"
                      >
                        −
                      </button>
                      <span className="text-sm text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 text-white/60 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/60 hover:text-white"
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg uppercase tracking-[0.2rem] text-white">
                    Total
                  </span>
                  <span className="text-xl font-semibold text-white">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
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

