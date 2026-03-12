import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppFab from "@/components/sections/WhatsAppFab";
import ReservationForm from "@/components/sections/ReservationForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.reservation" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: { fr: "/fr/reservation", en: "/en/reservation" },
    },
  };
}

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reservation" });

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
              className="font-display text-cream font-light mb-3"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {t("title")}
            </h1>
            <p className="text-cream/50 font-light text-sm">{t("subtitle")}</p>
          </div>
        </section>

        {/* Form */}
        <section className="bg-[#faf9f7] py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <ReservationForm />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
