"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/chambres/home-design.jpg"
          alt="L'Escale Verte — Hôtel Yaoundé"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/50 to-forest/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-24 lg:pb-32 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block text-xs tracking-[0.28em] uppercase text-gold mb-6"
          >
            {t("tagline")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-cream font-light leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}
          >
            {t("title")}{" "}
            <em className="text-gold not-italic">{t("titleHighlight")}</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-cream/70 font-light leading-relaxed mb-10 max-w-lg"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/reservation"
              className="inline-flex items-center gap-2 bg-gold text-forest text-xs font-semibold tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200 hover:bg-gold-light hover:shadow-xl hover:-translate-y-0.5"
            >
              {t("cta")}
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-transparent text-cream border border-cream/40 text-xs font-medium tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200 hover:bg-cream/10 hover:border-cream"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-cream/40"
      >
        <span className="text-xs tracking-[0.2em] uppercase">{t("scroll")}</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
