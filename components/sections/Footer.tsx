import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");

  const links = [
    { href: "/", label: tn("home") },
    { href: "/chambres", label: tn("rooms") },
    { href: "/services", label: tn("services") },
    { href: "/blog", label: tn("blog") },
    { href: "/contact", label: tn("contact") },
    { href: "/a-propos", label: tn("about") },
  ];

  return (
    <footer className="bg-forest text-cream/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <p className="font-display text-cream text-xl font-semibold tracking-widest uppercase">
                L&apos;<span className="text-gold">Escale</span> Verte
              </p>
              <p className="text-xs tracking-[0.2em] uppercase text-cream/35 mt-1">
                {t("tagline")}
              </p>
            </div>
            <p className="text-sm font-light leading-relaxed max-w-xs">
              {t("desc")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-4 font-medium">
              {t("nav")}
            </p>
            <ul className="space-y-2.5">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-cream/55 hover:text-cream transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-4 font-medium">
              {t("contact")}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm font-light">{t("address")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <a
                  href={`tel:${t("phone").replace(/\s/g, "")}`}
                  className="text-sm font-light hover:text-cream transition-colors"
                >
                  {t("phone")}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-gold flex-shrink-0" />
                <a
                  href={`mailto:${t("email")}`}
                  className="text-sm font-light hover:text-cream transition-colors"
                >
                  {t("email")}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={14} className="text-gold flex-shrink-0" />
                <span className="text-sm font-light">Réception 24h/24</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-cream/35">
            © {new Date().getFullYear()} L&apos;Escale Verte · {t("rights")}
          </p>
          <div className="flex gap-4">
            <Link
              href="/mentions-legales"
              className="text-xs text-cream/35 hover:text-cream/60 transition-colors"
            >
              {t("legal")}
            </Link>
            <Link
              href="/confidentialite"
              className="text-xs text-cream/35 hover:text-cream/60 transition-colors"
            >
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
