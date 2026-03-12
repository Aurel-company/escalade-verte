"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function BlogPreviewSection() {
  const t = useTranslations("blog");
  const posts = t.raw("posts") as Array<{
    date: string;
    title: string;
    excerpt: string;
    emoji: string;
    slug: string;
  }>;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.25em] uppercase text-gold block mb-2"
            >
              {t("tagline")}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-forest font-light"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
            >
              {t("title")}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/blog"
              className="text-xs tracking-[0.12em] uppercase text-forest border-b border-forest pb-0.5 hover:text-gold hover:border-gold transition-colors"
            >
              {t("viewAll")} →
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="border border-[#e5dfd4] bg-white hover:shadow-md transition-shadow duration-200 group cursor-pointer"
            >
              <div className="h-36 bg-gradient-to-br from-cream to-cream-dark flex items-center justify-center text-4xl">
                {post.emoji}
              </div>
              <div className="p-5">
                <span className="text-[10px] tracking-[0.15em] uppercase text-gold block mb-2">
                  {post.date}
                </span>
                <h3 className="font-display text-forest text-lg leading-tight mb-2 group-hover:text-forest-light transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[#6b6059] font-light leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs tracking-[0.1em] uppercase text-forest border-b border-transparent hover:border-gold hover:text-gold transition-all pb-0.5"
                >
                  {t("readMore")} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
