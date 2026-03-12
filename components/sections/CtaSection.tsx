"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CtaSection() {
  const t = useTranslations("cta");
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "237699000111";

  return (
    <section className="bg-forest py-20 lg:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(247,231,206,1) 40px, rgba(247,231,206,1) 41px)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.25em] uppercase text-gold block mb-4"
        >
          {t("tagline")}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-cream font-light mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-cream/60 font-light max-w-md mx-auto mb-10 text-sm leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/reservation"
            className="bg-gold text-forest text-xs font-semibold tracking-[0.1em] uppercase px-10 py-4 hover:bg-gold-light hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            {t("book")}
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-cream border border-cream/40 text-xs font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-cream/10 hover:border-cream transition-all duration-200 inline-flex items-center gap-2"
          >
            💬 {t("whatsapp")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
