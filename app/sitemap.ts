import { MetadataRoute } from "next";

const baseUrl = "https://lescaleverte.cm";
const locales = ["fr", "en"];

const routes = [
  "",
  "/chambres",
  "/services",
  "/reservation",
  "/blog",
  "/contact",
  "/a-propos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
