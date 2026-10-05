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

/**
 * Absolute URLs for the social card. Vercel supplies the production host, so
 * this keeps working if the project is renamed or a custom domain is added;
 * set NEXT_PUBLIC_SITE_URL to pin it to something specific.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = `${fullName} — ${profile.role}`;
const description = profile.headline;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  // app/opengraph-image.jpg and app/twitter-image.jpg are picked up automatically.
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    siteName: fullName,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
