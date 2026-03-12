import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppFab from "@/components/sections/WhatsAppFab";
import ContactForm from "@/components/sections/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: { fr: "/fr/contact", en: "/en/contact" },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "237699000111";

  const infos = [
    { icon: MapPin, label: t("address"), value: t("addressValue") },
    { icon: Phone, label: t("phone"), value: t("phoneValue"), href: `tel:${t("phoneValue").replace(/\s/g, "")}` },
    { icon: Mail, label: t("emailLabel"), value: t("emailValue"), href: `mailto:${t("emailValue")}` },
    { icon: Clock, label: t("hours"), value: t("hoursValue") },
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

        {/* Main content */}
        <section className="bg-[#faf9f7] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
              {/* Contact infos */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-5">
                  {infos.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-forest flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-gold font-medium mb-0.5">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm text-[#3d3530] font-light hover:text-forest transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-[#3d3530] font-light">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="bg-forest h-52 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(247,231,206,0.3) 20px, rgba(247,231,206,0.3) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(247,231,206,0.3) 20px, rgba(247,231,206,0.3) 21px)"
                    }}
                  />
                  <div className="relative z-10 text-center">
                    <MapPin size={24} className="text-gold mx-auto mb-2" />
                    <p className="text-cream/70 text-xs tracking-wider">Quartier Bastos</p>
                    <p className="text-cream/50 text-[10px]">Yaoundé, Cameroun</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white text-xs font-semibold tracking-[0.1em] uppercase py-4 hover:bg-[#1ebe5a] transition-colors"
                >
                  💬 {t("whatsappCta")}
                </a>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
