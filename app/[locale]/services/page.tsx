import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppFab from "@/components/sections/WhatsAppFab";
import CtaSection from "@/components/sections/CtaSection";
import { Check } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: { fr: "/fr/services", en: "/en/services" },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });

  const restaurantFeatures = t.raw("restaurantFeatures") as string[];
  const poolFeatures = t.raw("poolFeatures") as string[];
  const conferenceFeatures = t.raw("conferenceFeatures") as string[];
  const otherServices = t.raw("services") as Array<{
    icon: string;
    name: string;
    desc: string;
  }>;

  const mainServices = [
    {
      icon: "🍽️",
      title: t("restaurantTitle"),
      desc: t("restaurantDesc"),
      features: restaurantFeatures,
      image: "/images/chambres/download (5).jpeg",
      imageAlt: "Restaurant L'Escale Verte",
    },
    {
      icon: "🏊",
      title: t("poolTitle"),
      desc: t("poolDesc"),
      features: poolFeatures,
      image: "/images/chambres/download (3).jpeg",
      imageAlt: "Piscine L'Escale Verte",
    },
    {
      icon: "💼",
      title: t("conferenceTitle"),
      desc: t("conferenceDesc"),
      features: conferenceFeatures,
      image: "/images/chambres/download (4).jpeg",
      imageAlt: "Salle de conférence L'Escale Verte",
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

        {/* Main services */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16 lg:space-y-24">
            {mainServices.map((service, idx) => (
              <div
                key={service.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${
                  idx % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div
                  className={`relative h-72 lg:h-96 overflow-hidden ${
                    idx % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-forest to-forest-light flex items-center justify-center">
                    <span style={{ fontSize: "5rem" }}>{service.icon}</span>
                  </div>
                </div>
                <div>
                  <span className="text-4xl block mb-4">{service.icon}</span>
                  <h2
                    className="font-display text-forest font-light mb-4"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
                  >
                    {service.title}
                  </h2>
                  <p className="text-[#6b6059] font-light leading-relaxed mb-6 text-sm">
                    {service.desc}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5">
                        <Check size={13} className="text-gold flex-shrink-0" />
                        <span className="text-sm text-[#3d3530] font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other services grid */}
        <section className="bg-forest py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2
              className="font-display text-cream font-light text-center mb-12"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
            >
              {t("otherTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/5">
              {otherServices.map((s) => (
                <div
                  key={s.name}
                  className="bg-forest border border-cream/8 p-7 hover:border-gold hover:bg-forest-mid transition-all duration-200"
                >
                  <span className="text-2xl block mb-3">{s.icon}</span>
                  <h3 className="font-display text-cream text-lg mb-1.5 font-normal">
                    {s.name}
                  </h3>
                  <p className="text-cream/45 text-sm font-light leading-relaxed">
                    {s.desc}
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
