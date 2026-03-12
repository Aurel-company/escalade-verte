"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t("home") },
    { href: "/chambres", label: t("rooms") },
    { href: "/services", label: t("services") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "bg-forest shadow-lg"
          : "bg-forest/95 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-display text-cream text-lg lg:text-xl font-semibold tracking-widest uppercase">
              L&apos;<span className="text-gold">Escale</span> Verte
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "text-xs tracking-[0.14em] uppercase font-body transition-colors duration-200",
                    pathname === href
                      ? "text-gold"
                      : "text-cream/60 hover:text-cream"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Lang switcher */}
            <div className="flex border border-cream/20 overflow-hidden rounded-sm">
              {["fr", "en"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLocale(lang)}
                  className={cn(
                    "px-3 py-1.5 text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer",
                    locale === lang
                      ? "bg-cream/10 text-cream"
                      : "text-cream/50 hover:text-cream"
                  )}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <Link
              href="/reservation"
              className="bg-gold text-forest text-xs font-semibold tracking-[0.1em] uppercase px-5 py-2.5 transition-all duration-200 hover:bg-gold-light hover:shadow-lg"
            >
              {t("book")}
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden text-cream p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-forest border-t border-cream/10">
          <div className="px-6 py-4 space-y-3">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block text-sm tracking-[0.1em] uppercase py-2 transition-colors",
                  pathname === href
                    ? "text-gold"
                    : "text-cream/70 hover:text-cream"
                )}
              >
                {label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-cream/10">
              <div className="flex border border-cream/20 overflow-hidden rounded-sm">
                {["fr", "en"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      switchLocale(lang);
                      setMenuOpen(false);
                    }}
                    className={cn(
                      "px-3 py-1.5 text-xs tracking-wider uppercase transition-all",
                      locale === lang
                        ? "bg-cream/10 text-cream"
                        : "text-cream/50"
                    )}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
              <Link
                href="/reservation"
                onClick={() => setMenuOpen(false)}
                className="bg-gold text-forest text-xs font-semibold tracking-[0.1em] uppercase px-4 py-2 flex-1 text-center"
              >
                {t("book")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
