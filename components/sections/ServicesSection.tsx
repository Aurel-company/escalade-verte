"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const serviceIcons = ["🍽️", "🏊", "💼", "📶", "🛎️", "🚗"];

export default function ServicesSection() {
  const t = useTranslations("services");

  const services = [
    { key: "restaurant", icon: serviceIcons[0] },
    { key: "pool", icon: serviceIcons[1] },
    { key: "conference", icon: serviceIcons[2] },
    { key: "wifi", icon: serviceIcons[3] },
    { key: "reception", icon: serviceIcons[4] },
    { key: "parking", icon: serviceIcons[5] },
  ] as const;

  return (
    <section className="bg-forest py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.25em] uppercase text-gold block mb-3"
          >
            {t("tagline")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-cream font-light"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cream/50 font-light mt-3 max-w-lg mx-auto text-sm"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/5">
          {services.map(({ key, icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-forest border border-cream/8 p-8 hover:border-gold hover:bg-forest-mid transition-all duration-200 cursor-default group"
            >
              <span className="text-3xl mb-4 block">{icon}</span>
              <h3 className="font-display text-cream text-xl mb-2 font-normal">
                {t(`${key}.name` as `restaurant.name` | `pool.name` | `conference.name` | `wifi.name` | `reception.name` | `parking.name`)}
              </h3>
              <p className="text-cream/45 text-sm font-light leading-relaxed">
                {t(`${key}.desc` as `restaurant.desc` | `pool.desc` | `conference.desc` | `wifi.desc` | `reception.desc` | `parking.desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-gold border-b border-gold pb-0.5 hover:text-gold-light hover:border-gold-light transition-colors"
          >
            En savoir plus →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
