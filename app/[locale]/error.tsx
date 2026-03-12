"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";

// Traductions inline — error.tsx est une error boundary client,
// elle ne peut pas utiliser useTranslations de façon fiable
const i18n = {
  fr: {
    tagline: "Erreur inattendue",
    title: "Une erreur s'est produite",
    subtitle:
      "Quelque chose s'est mal passé lors du chargement de cette page. Vous pouvez réessayer ou retourner à l'accueil.",
    code: "Code",
    retry: "Réessayer",
    backHome: "Retour à l'accueil",
  },
  en: {
    tagline: "Unexpected error",
    title: "Something went wrong",
    subtitle:
      "Something went wrong while loading this page. You can try again or go back to the homepage.",
    code: "Code",
    retry: "Try again",
    backHome: "Back to homepage",
  },
} as const;

function detectLocale(): "fr" | "en" {
  if (typeof navigator === "undefined") return "fr";
  return navigator.language.startsWith("en") ? "en" : "fr";
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const t = i18n[detectLocale()];

  return (
    <>
      {/* Mini navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#102C26] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 lg:h-20 flex items-center justify-between">
          <Link href="/">
            <span
              className="text-[#F7E7CE] tracking-widest uppercase font-semibold"
              style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", fontSize: "1.1rem" }}
            >
              L&apos;<span style={{ color: "#C9A96E" }}>Escale</span> Verte
            </span>
          </Link>
        </div>
      </header>

      <div className="bg-[#faf9f7] min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-lg py-16">
          {/* Icon */}
          <div
            aria-hidden="true"
            className="select-none leading-none mb-8"
            style={{
              fontFamily: "var(--font-cormorant, Georgia, serif)",
              fontSize: "clamp(6rem, 16vw, 10rem)",
              fontWeight: 300,
              color: "#e5dfd4",
            }}
          >
            ⚠
          </div>

          {/* Gold divider */}
          <div
            className="h-px max-w-xs mx-auto mb-8"
            style={{
              background: "linear-gradient(to right, transparent, #C9A96E, transparent)",
            }}
          />

          <span
            className="block mb-4"
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C9A96E",
            }}
          >
            {t.tagline}
          </span>

          <h1
            className="mb-4"
            style={{
              fontFamily: "var(--font-cormorant, Georgia, serif)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 300,
              color: "#102C26",
            }}
          >
            {t.title}
          </h1>

          <p
            className="leading-relaxed mb-10"
            style={{ fontSize: "0.875rem", color: "#6b6059", fontWeight: 300 }}
          >
            {t.subtitle}
          </p>

          {error.digest && (
            <p
              className="mb-8 bg-[#f3f0ea] px-3 py-1.5 inline-block"
              style={{ fontSize: "0.625rem", fontFamily: "monospace", color: "#9d9285" }}
            >
              {t.code} : {error.digest}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={reset}
              className="bg-[#102C26] text-[#F7E7CE] text-xs font-semibold tracking-[0.1em] uppercase px-8 py-4 hover:bg-[#1a4238] transition-colors cursor-pointer"
            >
              {t.retry}
            </button>
            <Link
              href="/"
              className="bg-transparent text-[#102C26] border border-[#e5dfd4] text-xs font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-[#f3f0ea] transition-colors"
            >
              {t.backHome}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
