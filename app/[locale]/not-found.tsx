import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Traductions inline — aucune dépendance au contexte next-intl
const i18n = {
  fr: {
    tagline: "Page introuvable",
    title: "Cette page n'existe pas",
    subtitle:
      "La page que vous recherchez a peut-être été déplacée, renommée ou n'existe plus. Retournez à l'accueil pour continuer.",
    backHome: "Retour à l'accueil",
    contact: "Nous contacter",
    rooms: "Chambres",
    services: "Services",
    book: "Réserver",
    blog: "Blog",
  },
  en: {
    tagline: "Page not found",
    title: "This page doesn't exist",
    subtitle:
      "The page you're looking for may have been moved, renamed or no longer exists. Go back to the homepage to continue.",
    backHome: "Back to homepage",
    contact: "Contact us",
    rooms: "Rooms",
    services: "Services",
    book: "Book",
    blog: "Blog",
  },
} as const;

export default async function NotFound() {
  let locale: "fr" | "en" = "fr";
  try {
    const detected = await getLocale();
    if (detected === "en") locale = "en";
  } catch {
    // fallback fr
  }

  const t = i18n[locale];

  return (
    <>
      {/* Mini navbar — aucun hook, aucun provider nécessaire */}
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
          <Link
            href="/reservation"
            className="hidden sm:inline-flex bg-[#C9A96E] text-[#102C26] text-xs font-semibold tracking-[0.1em] uppercase px-5 py-2.5 hover:bg-[#dfc08a] transition-colors"
          >
            {t.book}
          </Link>
        </div>
      </header>

      <main className="bg-[#faf9f7] min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-lg py-16">
          {/* Decorative 404 */}
          <div
            aria-hidden="true"
            className="select-none leading-none mb-8"
            style={{
              fontFamily: "var(--font-cormorant, Georgia, serif)",
              fontSize: "clamp(8rem, 20vw, 14rem)",
              fontWeight: 300,
              color: "#e5dfd4",
            }}
          >
            404
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

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="bg-[#102C26] text-[#F7E7CE] text-xs font-semibold tracking-[0.1em] uppercase px-8 py-4 hover:bg-[#1a4238] transition-colors"
            >
              {t.backHome}
            </Link>
            <Link
              href="/contact"
              className="bg-transparent text-[#102C26] border border-[#e5dfd4] text-xs font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-[#f3f0ea] transition-colors"
            >
              {t.contact}
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {(
              [
                { href: "/chambres", label: t.rooms },
                { href: "/services", label: t.services },
                { href: "/reservation", label: t.book },
                { href: "/blog", label: t.blog },
              ] as const
            ).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs tracking-[0.1em] uppercase text-[#9d9285] hover:text-[#C9A96E] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
