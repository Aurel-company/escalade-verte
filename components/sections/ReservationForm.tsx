"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import { Check, X } from "lucide-react";

const schema = z.object({
  nom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().min(8),
  typeChambre: z.enum(["Standard", "Deluxe"]),
  nbPersonnes: z.number().min(1).max(4),
  dateArrivee: z.string().min(1),
  dateDepart: z.string().min(1),
  demandesSpeciales: z.string().optional(),
  newsletter: z.boolean().optional(),
  conditions: z
    .boolean()
    .refine((val) => val === true, { message: "acceptTerms" }),
});

type FormData = z.infer<typeof schema>;

type Status = "idle" | "loading" | "success" | "error";

export default function ReservationForm() {
  const t = useTranslations("reservation");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "237699000111";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      typeChambre: "Standard",
      nbPersonnes: 2,
      newsletter: false,
      conditions: true,
    },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, langue: locale }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-[#e5dfd4] shadow-md p-8 lg:p-10">
      <h2 className="font-display text-forest text-2xl font-normal mb-1">
        {t("title")}
      </h2>
      <p className="text-sm text-[#9d9285] font-light mb-7">{t("subtitle")}</p>

      {/* Success modal */}
      {status === "success" && (
        <div className="fixed inset-0 z-50 bg-forest/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl">
            <div className="p-6 border-b border-[#e5dfd4] flex items-start justify-between">
              <h3 className="font-display text-forest text-xl font-normal">
                {t("successTitle")}
              </h3>
              <button
                onClick={() => setStatus("idle")}
                className="text-[#9d9285] hover:text-forest transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Check size={16} className="text-[#27ae60]" />
                <span className="text-sm text-[#3d3530] font-light leading-relaxed">
                  {t("successMsg")}
                </span>
              </div>
            </div>
            <div className="p-6 pt-0 flex gap-3 justify-end border-t border-[#e5dfd4]">
              <button
                onClick={() => setStatus("idle")}
                className="text-xs tracking-[0.1em] uppercase text-forest border border-[#e5dfd4] px-4 py-2 hover:bg-[#f3f0ea] transition-colors cursor-pointer"
              >
                {t("close")}
              </button>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.1em] uppercase bg-forest text-cream px-4 py-2 hover:bg-forest-mid transition-colors"
              >
                💬 {t("whatsapp")}
              </a>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mb-5 p-3 bg-[#fdf3f2] border-l-4 border-[#c0392b] text-sm text-[#721c24]">
          {t("errorMsg")}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[0.12em] uppercase font-medium text-forest">
              {t("name")}
            </label>
            <input
              {...register("nom")}
              type="text"
              placeholder={t("namePlaceholder")}
              className={`w-full px-3 py-2.5 border text-sm font-light text-forest bg-white outline-none transition-colors placeholder:text-[#9d9285] focus:border-forest focus:shadow-[0_0_0_3px_rgba(16,44,38,0.08)] ${
                errors.nom
                  ? "border-[#c0392b]"
                  : "border-[#e5dfd4]"
              }`}
            />
            {errors.nom && (
              <span className="text-[11px] text-[#c0392b]">{t("required")}</span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[0.12em] uppercase font-medium text-forest">
              {t("email")}
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder={t("emailPlaceholder")}
              className={`w-full px-3 py-2.5 border text-sm font-light text-forest bg-white outline-none transition-colors placeholder:text-[#9d9285] focus:border-forest focus:shadow-[0_0_0_3px_rgba(16,44,38,0.08)] ${
                errors.email
                  ? "border-[#c0392b]"
                  : "border-[#e5dfd4]"
              }`}
            />
            {errors.email && (
              <span className="text-[11px] text-[#c0392b]">{t("invalidEmail")}</span>
            )}
          </div>
        </div>

        {/* Row 2: Phone + Room type + Persons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[0.12em] uppercase font-medium text-forest">
              {t("phone")}
            </label>
            <input
              {...register("telephone")}
              type="tel"
              placeholder={t("phonePlaceholder")}
              className={`w-full px-3 py-2.5 border text-sm font-light text-forest bg-white outline-none transition-colors placeholder:text-[#9d9285] focus:border-forest focus:shadow-[0_0_0_3px_rgba(16,44,38,0.08)] ${
                errors.telephone ? "border-[#c0392b]" : "border-[#e5dfd4]"
              }`}
            />
            {errors.telephone && (
              <span className="text-[11px] text-[#c0392b]">{t("invalidPhone")}</span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[0.12em] uppercase font-medium text-forest">
              {t("roomType")}
            </label>
            <select
              {...register("typeChambre")}
              className="w-full px-3 py-2.5 border border-[#e5dfd4] text-sm font-light text-forest bg-white outline-none appearance-none focus:border-forest focus:shadow-[0_0_0_3px_rgba(16,44,38,0.08)]"
            >
              <option value="Standard">{t("standard")}</option>
              <option value="Deluxe">{t("deluxe")}</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[0.12em] uppercase font-medium text-forest">
              {t("persons")}
            </label>
            <input
              {...register("nbPersonnes", { valueAsNumber: true })}
              type="number"
              min={1}
              max={4}
              className="w-full px-3 py-2.5 border border-[#e5dfd4] text-sm font-light text-forest bg-white outline-none focus:border-forest focus:shadow-[0_0_0_3px_rgba(16,44,38,0.08)]"
            />
          </div>
        </div>

        {/* Row 3: Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[0.12em] uppercase font-medium text-forest">
              {t("arrival")}
            </label>
            <input
              {...register("dateArrivee")}
              type="date"
              className={`w-full px-3 py-2.5 border text-sm font-light text-forest bg-white outline-none focus:border-forest focus:shadow-[0_0_0_3px_rgba(16,44,38,0.08)] ${
                errors.dateArrivee ? "border-[#c0392b]" : "border-[#e5dfd4]"
              }`}
            />
            {errors.dateArrivee && (
              <span className="text-[11px] text-[#c0392b]">{t("required")}</span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[0.12em] uppercase font-medium text-forest">
              {t("departure")}
            </label>
            <input
              {...register("dateDepart")}
              type="date"
              className={`w-full px-3 py-2.5 border text-sm font-light text-forest bg-white outline-none focus:border-forest focus:shadow-[0_0_0_3px_rgba(16,44,38,0.08)] ${
                errors.dateDepart ? "border-[#c0392b]" : "border-[#e5dfd4]"
              }`}
            />
            {errors.dateDepart && (
              <span className="text-[11px] text-[#c0392b]">{t("required")}</span>
            )}
          </div>
        </div>

        {/* Special requests */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] tracking-[0.12em] uppercase font-medium text-forest">
            {t("special")}
          </label>
          <textarea
            {...register("demandesSpeciales")}
            placeholder={t("specialPlaceholder")}
            rows={3}
            className="w-full px-3 py-2.5 border border-[#e5dfd4] text-sm font-light text-forest bg-white outline-none resize-none focus:border-forest focus:shadow-[0_0_0_3px_rgba(16,44,38,0.08)] placeholder:text-[#9d9285]"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              {...register("newsletter")}
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-forest flex-shrink-0"
            />
            <span className="text-sm font-light text-[#3d3530]">
              {t("newsletter")}
            </span>
          </label>
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                {...register("conditions")}
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-forest flex-shrink-0"
              />
              <span className="text-sm font-light text-[#3d3530]">
                {t("terms")}
              </span>
            </label>
            {errors.conditions && (
              <span className="text-[11px] text-[#c0392b] ml-7">
                {t("acceptTerms")}
              </span>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-forest text-cream text-xs font-semibold tracking-[0.12em] uppercase py-4 hover:bg-forest-mid transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === "loading" ? t("sending") : t("submit")}
        </button>
      </form>
    </div>
  );
}
