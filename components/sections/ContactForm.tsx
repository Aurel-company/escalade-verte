"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

const schema = z.object({
  nom: z.string().min(2),
  email: z.string().email(),
  sujet: z.string().min(3),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-3 py-2.5 border text-sm font-light text-forest bg-white outline-none transition-colors placeholder:text-[#9d9285] focus:border-forest focus:shadow-[0_0_0_3px_rgba(16,44,38,0.08)] ${
      hasError ? "border-[#c0392b]" : "border-[#e5dfd4]"
    }`;

  return (
    <div className="bg-white border border-[#e5dfd4] p-8">
      {status === "success" && (
        <div className="mb-5 p-3 bg-[#f0faf4] border-l-4 border-[#27ae60] text-sm text-[#155724]">
          {t("successMsg")}
        </div>
      )}
      {status === "error" && (
        <div className="mb-5 p-3 bg-[#fdf3f2] border-l-4 border-[#c0392b] text-sm text-[#721c24]">
          {t("errorMsg")}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[0.12em] uppercase font-medium text-forest">
              {t("name")}
            </label>
            <input
              {...register("nom")}
              type="text"
              placeholder={t("namePlaceholder")}
              className={inputClass(!!errors.nom)}
            />
            {errors.nom && (
              <span className="text-[11px] text-[#c0392b]">Champ requis</span>
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
              className={inputClass(!!errors.email)}
            />
            {errors.email && (
              <span className="text-[11px] text-[#c0392b]">Email invalide</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] tracking-[0.12em] uppercase font-medium text-forest">
            {t("subject")}
          </label>
          <input
            {...register("sujet")}
            type="text"
            placeholder={t("subjectPlaceholder")}
            className={inputClass(!!errors.sujet)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] tracking-[0.12em] uppercase font-medium text-forest">
            {t("message")}
          </label>
          <textarea
            {...register("message")}
            placeholder={t("messagePlaceholder")}
            rows={5}
            className={`${inputClass(!!errors.message)} resize-none`}
          />
        </div>
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
