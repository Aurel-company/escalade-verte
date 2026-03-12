import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppFab from "@/components/sections/WhatsAppFab";
import CtaSection from "@/components/sections/CtaSection";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.rooms" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: { fr: "/fr/chambres", en: "/en/chambres" },
    },
  };
}

export default async function ChambresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "chambres" });

  const standardFeatures = t.raw("standardFeatures") as string[];
  const deluxeFeatures = t.raw("deluxeFeatures") as string[];
  const includedItems = t.raw("includedItems") as string[];

  const rooms = [
    {
      key: "standard",
      image: "/images/chambres/download (1).jpeg",
      image2: "/images/chambres/download (3).jpeg",
      price: "35 000 FCFA",
      badge: { label: "Disponible", class: "bg-cream text-forest border border-cream-dark" },
      features: standardFeatures,
      title: t("standardTitle"),
      desc: t("standardDesc"),
    },
    {
      key: "deluxe",
      image: "/images/chambres/download (2).jpeg",
      image2: "/images/chambres/download (4).jpeg",
      price: "55 000 FCFA",
      badge: { label: "Premium", class: "bg-gold text-forest" },
      features: deluxeFeatures,
      title: t("deluxeTitle"),
      desc: t("deluxeDesc"),
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
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

        {/* Rooms */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20 lg:space-y-28">
            {rooms.map((room, idx) => (
              <div
                key={room.key}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${
                  idx % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Images */}
                <div
                  className={`grid grid-cols-2 gap-3 ${
                    idx % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="relative h-56 lg:h-72 col-span-2 overflow-hidden">
                    <span
                      className={`absolute top-3 left-3 z-10 text-[10px] tracking-[0.12em] uppercase font-medium px-2.5 py-1 ${room.badge.class}`}
                    >
                      {room.badge.label}
                    </span>
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={room.image2}
                      alt={`${room.title} — détail`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative h-36 bg-forest flex flex-col items-center justify-center gap-1">
                    <span className="font-display text-gold font-light" style={{ fontSize: "1.8rem" }}>
                      {room.price}
                    </span>
                    <span className="text-xs text-cream/50 tracking-wider">{t("perNight")}</span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h2
                    className="font-display text-forest font-light mb-4"
                    style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
                  >
                    {room.title}
                  </h2>
                  <p className="text-[#6b6059] font-light leading-relaxed mb-6 text-sm">
                    {room.desc}
                  </p>

                  <div className="mb-6">
                    <p className="text-xs tracking-[0.15em] uppercase text-gold mb-3 font-medium">
                      Équipements
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {room.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2">
                          <Check size={12} className="text-gold flex-shrink-0" />
                          <span className="text-sm text-[#3d3530] font-light">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8 bg-[#f3f0ea] p-4">
                    <p className="text-xs tracking-[0.15em] uppercase text-gold mb-3 font-medium">
                      {t("included")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {includedItems.map((item) => (
                        <span
                          key={item}
                          className="text-xs text-[#6b6059] border border-[#e5dfd4] px-3 py-1"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/reservation"
                    className="inline-flex items-center gap-2 bg-forest text-cream text-xs font-semibold tracking-[0.1em] uppercase px-8 py-4 hover:bg-forest-mid transition-colors"
                  >
                    {t("bookRoom")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
