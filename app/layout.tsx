import type { Metadata } from "next";
import { Archivo, Inter, Instrument_Serif } from "next/font/google";
import { fullName, profile } from "@/lib/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${fullName} — ${profile.role}`,
  description: profile.tagline,
  openGraph: {
    title: `${fullName} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${inter.variable} ${instrument.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
