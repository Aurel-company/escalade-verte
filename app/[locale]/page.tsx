import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AvailabilityStrip from "@/components/sections/AvailabilityStrip";
import StatsSection from "@/components/sections/StatsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import RoomsSection from "@/components/sections/RoomsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogPreviewSection from "@/components/sections/BlogPreviewSection";
import CtaSection from "@/components/sections/CtaSection";
import WhatsAppFab from "@/components/sections/WhatsAppFab";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en" },
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AvailabilityStrip />
        <StatsSection />
        <ServicesSection />
        <RoomsSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
