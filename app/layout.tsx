import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lescaleverte.cm"),
  title: {
    default: "L'Escale Verte — Hôtel ★★★ Yaoundé, Cameroun",
    template: "%s | L'Escale Verte",
  },
  description:
    "Hôtel 3 étoiles au cœur de Yaoundé, Cameroun. Chambres confortables, piscine, restaurant, salle de conférence. Réservez directement.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    siteName: "L'Escale Verte",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(cormorant.variable, jost.variable)}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#102C26" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
