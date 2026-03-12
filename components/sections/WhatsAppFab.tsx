"use client";

import Image from "next/image";

export default function WhatsAppFab() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "237699000111";
  const message = encodeURIComponent(
    "Bonjour, je souhaite avoir des informations sur l'hôtel L'Escale Verte."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter par WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200"
    >
      <Image
        src="/images/icons/whatsapp.png"
        alt="WhatsApp"
        width={28}
        height={28}
        className="w-7 h-7 object-contain"
      />
    </a>
  );
}
