import dynamic from "next/dynamic";
import Hero from "@/components/hero/hero";

// Dynamically import components below the fold
const About = dynamic(() => import("@/components/about/about"));
const TechStack = dynamic(() => import("@/components/techstack/grid"));
const ExperienceJourney = dynamic(() => import("@/components/experience/journey"));
const Projects = dynamic(() => import("@/components/projects/projects"));
const Education = dynamic(() => import("@/components/education/education"));
const CertGrid = dynamic(() => import("@/components/certifications/cert-grid"));
const LanguageSection = dynamic(() => import("@/components/languages/languages"));
const Marquee = dynamic(() => import("@/components/companies/marquee"));
const ContactForm = dynamic(() => import("@/components/contact/contact-form"));
import { Locale } from "@/types/i18n";
import { getDictionary } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  
  const dict = {
    common: await getDictionary(lang, "common"),
    about: await getDictionary(lang, "about"),
    experience: await getDictionary(lang, "experience"),
    projects: await getDictionary(lang, "projects"),
    certifications: await getDictionary(lang, "certifications"),
    techstack: await getDictionary(lang, "techstack"),
    education: await getDictionary(lang, "education"),
    languages: await getDictionary(lang, "languages"),
  };

  return (
    <main className="flex flex-col items-center w-full relative">
      <Hero dict={dict.common.hero} />
      <About dict={dict.about} />
      <TechStack dict={dict.techstack} />
      <Marquee dict={dict.common} />
      <ExperienceJourney dict={dict.experience} />
      <Projects dict={dict.projects} />
      <Education dict={dict.education} />
      <LanguageSection dict={dict.languages} />
      <CertGrid dict={dict.certifications} />
      <ContactForm dict={dict.common.contact} />
    </main>
  );
}
