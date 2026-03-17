import "server-only";
import { Locale, Dictionary } from "@/types/i18n";

const dictionaries = {
  en: {
    common: () => import("@/data/en/common.json").then((module) => module.default),
    about: () => import("@/data/en/about.json").then((module) => module.default),
    experience: () => import("@/data/en/experience.json").then((module) => module.default),
    projects: () => import("@/data/en/projects.json").then((module) => module.default),
    certifications: () => import("@/data/en/certifications.json").then((module) => module.default),
    techstack: () => import("@/data/en/techstack.json").then((module) => module.default),
    education: () => import("@/data/en/education.json").then((module) => module.default),
    languages: () => import("@/data/en/languages.json").then((module) => module.default),
  },
  id: {
    common: () => import("@/data/id/common.json").then((module) => module.default),
    about: () => import("@/data/id/about.json").then((module) => module.default),
    experience: () => import("@/data/id/experience.json").then((module) => module.default),
    projects: () => import("@/data/id/projects.json").then((module) => module.default),
    certifications: () => import("@/data/id/certifications.json").then((module) => module.default),
    techstack: () => import("@/data/id/techstack.json").then((module) => module.default),
    education: () => import("@/data/id/education.json").then((module) => module.default),
    languages: () => import("@/data/id/languages.json").then((module) => module.default),
  },
};

export const getDictionary = async <K extends keyof Dictionary>(
  locale: Locale,
  key: K
): Promise<Dictionary[K]> => {
  return dictionaries[locale][key]() as unknown as Promise<Dictionary[K]>;
};

export type { Locale, Dictionary };
export * from "@/types/i18n";
