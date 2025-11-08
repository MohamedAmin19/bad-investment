import type { Metadata } from "next";
import {
  Anton,
  Geist,
  Geist_Mono,
  Karantina,
  League_Spartan,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const karantina = Karantina({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-karantina",
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
});

export const metadata: Metadata = {
  title: "LEGE-CY | Music Collective",
  description:
    "LEGE-CY is a music collective bringing artists and fans together through live experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${karantina.variable} ${leagueSpartan.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
