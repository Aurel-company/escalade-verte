"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function RoomsSection() {
  const t = useTranslations("rooms");

  const rooms = [
    {
      key: "standard",
      image: "/images/chambres/download (1).jpeg",
      badge: t("available"),
      badgeClass: "bg-cream text-forest border border-cream-dark",
    },
    {
      key: "deluxe",
      image: "/images/chambres/download (2).jpeg",
      badge: t("premium"),
      badgeClass: "bg-gold text-forest",
    },
  ] as const;

  return (
    <section className="bg-white py-20 lg:py-28">
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
            className="font-display text-forest font-light"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#6b6059] font-light mt-3 max-w-lg mx-auto text-sm"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {rooms.map(({ key, image, badge, badgeClass }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="border border-[#e5dfd4] bg-white group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={image}
                  alt={t(`${key}.name` as "standard.name" | "deluxe.name")}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span
                  className={`absolute top-3 left-3 text-[10px] tracking-[0.12em] uppercase font-medium px-2.5 py-1 ${badgeClass}`}
                >
                  {badge}
                </span>
              </div>
              <div className="p-6">
                <span className="text-[10px] tracking-[0.2em] uppercase text-gold block mb-1.5">
                  {t(`${key}.category` as "standard.category" | "deluxe.category")}
                </span>
                <h3 className="font-display text-forest text-2xl font-normal mb-2">
                  {t(`${key}.name` as "standard.name" | "deluxe.name")}
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(t.raw(`${key}.features` as "standard.features" | "deluxe.features") as string[]).map(
                    (feat: string) => (
                      <span
                        key={feat}
                        className="text-[10px] tracking-[0.1em] uppercase border border-[#e5dfd4] text-[#6b6059] px-2 py-0.5"
                      >
                        {feat}
                      </span>
                    )
                  )}
                </div>
                <p className="text-sm text-[#6b6059] font-light leading-relaxed mb-4">
                  {t(`${key}.desc` as "standard.desc" | "deluxe.desc")}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display text-forest text-xl">
                      {t(`${key}.price` as "standard.price" | "deluxe.price")}
                    </span>
                    <span className="text-xs text-[#9d9285] ml-1">{t("perNight")}</span>
                  </div>
                  <Link
                    href="/reservation"
                    className="bg-forest text-cream text-xs tracking-[0.1em] uppercase font-medium px-5 py-2.5 hover:bg-forest-mid transition-colors"
                  >
                    {t("book")}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/chambres"
            className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-forest border-b border-forest pb-0.5 hover:text-gold hover:border-gold transition-colors"
          >
            {t("viewMore")} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
