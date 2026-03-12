"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={s <= rating ? "text-gold" : "text-[#e5dfd4]"}
          style={{ fontSize: "0.75rem" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Array<{
    text: string;
    name: string;
    origin: string;
    rating: number;
    initial: string;
  }>;

  return (
    <section className="bg-[#f3f0ea] py-20 lg:py-28">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-[#e5dfd4] p-6"
            >
              <div
                className="font-display text-gold leading-none mb-3"
                style={{ fontSize: "3rem", opacity: 0.4, lineHeight: 0.8 }}
              >
                &ldquo;
              </div>
              <p className="text-sm text-[#3d3530] leading-relaxed font-light italic mb-5">
                {item.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-cream font-display flex-shrink-0">
                  {item.initial}
                </div>
                <div>
                  <p className="text-sm font-medium text-forest">{item.name}</p>
                  <p className="text-xs text-[#9d9285] font-light flex items-center gap-1.5">
                    {item.origin}
                    <span className="inline-block w-px h-3 bg-[#e5dfd4]" />
                    <StarRating rating={item.rating} />
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
