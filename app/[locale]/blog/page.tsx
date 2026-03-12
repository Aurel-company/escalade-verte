import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppFab from "@/components/sections/WhatsAppFab";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.blog" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: { fr: "/fr/blog", en: "/en/blog" },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = t.raw("posts") as Array<{
    date: string;
    title: string;
    excerpt: string;
    emoji: string;
    slug: string;
  }>;

  const allPosts = [
    ...posts,
    {
      date: locale === "fr" ? "25 Mai 2025" : "May 25, 2025",
      title: locale === "fr" ? "Guide complet pour visiter Yaoundé" : "Complete guide to visiting Yaoundé",
      excerpt: locale === "fr"
        ? "Tout ce qu'il faut savoir pour visiter la capitale camerounaise : transports, quartiers, incontournables."
        : "Everything you need to know to visit the Cameroonian capital: transport, neighborhoods, must-sees.",
      emoji: "🗺️",
      slug: locale === "fr" ? "guide-visiter-yaounde" : "guide-visit-yaounde",
    },
    {
      date: locale === "fr" ? "12 Avril 2025" : "April 12, 2025",
      title: locale === "fr" ? "Accords mets & boissons camerounais" : "Cameroonian food & drink pairings",
      excerpt: locale === "fr"
        ? "Notre chef partage ses conseils pour marier au mieux les spécialités camerounaises avec les boissons locales."
        : "Our chef shares tips for pairing Cameroonian specialties with local drinks.",
      emoji: "🍷",
      slug: locale === "fr" ? "accords-mets-boissons" : "food-drink-pairings",
    },
    {
      date: locale === "fr" ? "3 Mars 2025" : "March 3, 2025",
      title: locale === "fr" ? "Préparer son séjour d'affaires à Yaoundé" : "Preparing your business trip to Yaoundé",
      excerpt: locale === "fr"
        ? "Conseils pratiques pour les voyageurs d'affaires : quartiers, connectivité, infrastructures de réunion."
        : "Practical tips for business travelers: neighborhoods, connectivity, meeting infrastructure.",
      emoji: "💼",
      slug: locale === "fr" ? "sejour-affaires-yaounde" : "business-trip-yaounde",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-forest pt-28 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(247,231,206,1) 40px, rgba(247,231,206,1) 41px)",
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <span className="text-xs tracking-[0.28em] uppercase text-gold block mb-3">
              {t("tagline")}
            </span>
            <h1
              className="font-display text-cream font-light mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {t("title")}
            </h1>
            <p className="text-cream/60 font-light max-w-xl text-sm leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="bg-[#faf9f7] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPosts.map((post) => (
                <article
                  key={post.slug}
                  className="border border-[#e5dfd4] bg-white hover:shadow-md transition-shadow duration-200 group"
                >
                  <div className="h-40 bg-gradient-to-br from-cream to-cream-dark flex items-center justify-center text-5xl">
                    {post.emoji}
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] tracking-[0.15em] uppercase text-gold block mb-2">
                      {post.date}
                    </span>
                    <h2 className="font-display text-forest text-xl leading-tight mb-3 group-hover:text-forest-light transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#6b6059] font-light leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs tracking-[0.1em] uppercase text-forest border-b border-transparent hover:border-gold hover:text-gold transition-all pb-0.5"
                    >
                      {t("readMore")} →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
