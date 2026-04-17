import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://salahudinkholikprasetyono.netlify.app";
  const locales = ["en", "id"];

  // Homepage with localized alternates
  const homepage: MetadataRoute.Sitemap[number] = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: {
        en: `${baseUrl}/en`,
        id: `${baseUrl}/id`,
      },
    },
  };

  // Localized routes
  const routes = locales.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}/en`,
        id: `${baseUrl}/id`,
      },
    },
  }));

  return [homepage, ...routes];
}
