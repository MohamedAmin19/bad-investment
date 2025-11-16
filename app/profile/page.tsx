"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { HeaderNav } from "@/components/HeaderNav";
import { SiteFooter } from "@/components/SiteFooter";
import { mainMenuItems } from "@/lib/navigation";
import { socialLinks } from "@/lib/socialLinks";
import { useAuth } from "@/contexts/AuthContext";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  id: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/orders?userId=${user.uid}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch orders");
        }

        setOrders(data.orders || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
    }).format(price);
  };

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getImageSrc = (imageUrl: string) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("data:")) {
      return imageUrl;
    }
    return `data:image/jpeg;base64,${imageUrl}`;
  };

  if (authLoading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div
          className="text-sm uppercase tracking-[0.3rem] text-white/60"
          style={{ fontFamily: "var(--font-league-spartan)" }}
        >
          Loading...
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
            <div className="flex items-center justify-between">
              <h1
                className="text-3xl uppercase tracking-[0.4rem]"
                style={{ fontFamily: "var(--font-karantina)" }}
              >
                Profile
              </h1>
              <button
                onClick={handleLogout}
                className="rounded-sm border border-white/20 px-6 py-2 text-sm uppercase tracking-[0.2rem] text-white transition-opacity hover:opacity-80"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                Logout
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <p
                className="text-sm text-white/70"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                Email: {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h2
              className="text-xl uppercase tracking-[0.3rem]"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              My Orders
            </h2>

            {isLoading ? (
              <div
                className="text-center text-sm text-white/60"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                Loading orders...
              </div>
            ) : error ? (
              <div
                className="text-center text-sm text-red-400"
                style={{ fontFamily: "var(--font-league-spartan)" }}
              >
                {error}
              </div>
            ) : orders.length === 0 ? (
              <div className="flex flex-col items-center gap-4">
                <p
                  className="text-sm text-white/60"
                  style={{ fontFamily: "var(--font-league-spartan)" }}
                >
                  No orders yet.
                </p>
                <Link
                  href="/store"
                  className="rounded-sm bg-white/20 px-8 py-2 text-sm uppercase tracking-[0.3rem] text-white transition-opacity hover:opacity-80"
                  style={{ fontFamily: "var(--font-league-spartan)" }}
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border-b border-white/10 pb-6 last:border-0"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p
                          className="text-sm font-semibold text-white"
                          style={{ fontFamily: "var(--font-league-spartan)" }}
                        >
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p
                          className="text-xs text-white/60"
                          style={{ fontFamily: "var(--font-league-spartan)" }}
                        >
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <p
                          className="text-sm font-semibold text-white"
                          style={{ fontFamily: "var(--font-league-spartan)" }}
                        >
                          {formatPrice(order.total)}
                        </p>
                        <span
                          className="text-xs uppercase tracking-[0.1rem] text-white/60"
                          style={{ fontFamily: "var(--font-league-spartan)" }}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4"
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
                          <p className="text-sm font-semibold text-white">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
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

