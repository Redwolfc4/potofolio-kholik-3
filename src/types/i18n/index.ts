import { CommonDict } from "./common";
import { AboutDict } from "./about";
import { ExperienceDict } from "./experience";
import { ProjectsDict } from "./projects";
import { CertificationsDict } from "./certifications";
import { TechStackDict } from "./techstack";
import { EducationDict } from "./education";
import { LanguagesDict } from "./languages";

export const locales = ["en", "id"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export interface Dictionary {
  common: CommonDict;
  about: AboutDict;
  experience: ExperienceDict;
  projects: ProjectsDict;
  certifications: CertificationsDict;
  techstack: TechStackDict;
  education: EducationDict;
  languages: LanguagesDict;
}

export * from "./common";
export * from "./about";
export * from "./experience";
export * from "./projects";
export * from "./certifications";
export * from "./techstack";
export * from "./education";
export * from "./languages";
