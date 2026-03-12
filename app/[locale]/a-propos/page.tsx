import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppFab from "@/components/sections/WhatsAppFab";
import CtaSection from "@/components/sections/CtaSection";
import StatsSection from "@/components/sections/StatsSection";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: { fr: "/fr/a-propos", en: "/en/a-propos" },
    },
  };
}

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const values = t.raw("values") as Array<{
    icon: string;
    name: string;
    desc: string;
  }>;

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
              {t("title")}{" "}
              <em className="text-gold not-italic">{t("titleHighlight")}</em>
            </h1>
          </div>
        </section>

        {/* Story */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div className="space-y-5">
                <p className="text-[#6b6059] font-light leading-relaxed text-base">
                  {t("story")}
                </p>
                <p className="text-[#6b6059] font-light leading-relaxed text-base">
                  {t("story2")}
                </p>
              </div>
              <div className="relative h-80 lg:h-full min-h-[360px] overflow-hidden">
                <Image
                  src="/images/chambres/home-design.jpg"
                  alt="L'Escale Verte"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-forest/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <StatsSection />

        {/* Values */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2
              className="font-display text-forest font-light text-center mb-12"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
            >
              {t("valuesTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v) => (
                <div
                  key={v.name}
                  className="text-center p-8 border border-[#e5dfd4] hover:border-gold transition-colors"
                >
                  <span className="text-4xl block mb-4">{v.icon}</span>
                  <h3 className="font-display text-forest text-xl mb-2 font-normal">
                    {v.name}
                  </h3>
                  <p className="text-sm text-[#6b6059] font-light leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
