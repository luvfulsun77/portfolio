import type { MetadataRoute } from "next";
import { getAllWorks } from "../lib/content";

export const dynamic = "force-static";

const SITE = "https://www.yuayera.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const works = getAllWorks();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "monthly" },
    { url: `${SITE}/works`, lastModified: now, changeFrequency: "monthly" },
    {
      url: `${SITE}/recognition`,
      lastModified: now,
      changeFrequency: "monthly",
    },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "yearly" },
  ];

  const workRoutes: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${SITE}/works/${w.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
  }));

  return [...staticRoutes, ...workRoutes];
}
