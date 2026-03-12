"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    { num: t("stars"), label: t("starsLabel") },
    { num: t("rooms"), label: t("roomsLabel") },
    { num: t("rating"), label: t("ratingLabel") },
    { num: t("conf"), label: t("confLabel") },
  ];

  return (
    <section className="bg-forest-mid">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-cream/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-forest-mid text-center py-10 px-4"
            >
              <span className="font-display text-gold font-light block"
                style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 1 }}
              >
                {stat.num}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-cream/45 block mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
