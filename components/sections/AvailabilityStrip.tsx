"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function AvailabilityStrip() {
  const t = useTranslations("availability");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams({
      arrival: data.get("arrival") as string,
      departure: data.get("departure") as string,
      persons: data.get("persons") as string,
    });
    router.push(`/reservation?${params.toString()}`);
  };

  return (
    <div className="bg-gold">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center gap-3 py-4"
        >
          <div className="flex flex-col gap-0.5 flex-1 min-w-[130px]">
            <label className="text-[10px] tracking-[0.15em] uppercase text-forest/60 font-medium">
              {t("arrival")}
            </label>
            <input
              type="date"
              name="arrival"
              className="bg-forest/10 border border-forest/15 text-forest text-sm font-light px-3 py-2 outline-none w-full placeholder:text-forest/40 focus:border-forest/40"
            />
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-[130px]">
            <label className="text-[10px] tracking-[0.15em] uppercase text-forest/60 font-medium">
              {t("departure")}
            </label>
            <input
              type="date"
              name="departure"
              className="bg-forest/10 border border-forest/15 text-forest text-sm font-light px-3 py-2 outline-none w-full focus:border-forest/40"
            />
          </div>
          <div className="flex flex-col gap-0.5 min-w-[140px]">
            <label className="text-[10px] tracking-[0.15em] uppercase text-forest/60 font-medium">
              {t("persons")}
            </label>
            <select
              name="persons"
              className="bg-forest/10 border border-forest/15 text-forest text-sm font-light px-3 py-2 outline-none appearance-none focus:border-forest/40"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {t(`person${n}` as "person1" | "person2" | "person3" | "person4")}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-forest text-cream text-xs font-semibold tracking-[0.12em] uppercase px-6 py-3 mt-4 sm:mt-0 self-end transition-colors hover:bg-forest-mid whitespace-nowrap cursor-pointer"
          >
            {t("check")}
          </button>
        </form>
      </div>
    </div>
  );
}
