import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
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
import { getDictionary, isValidLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }
  
  const [
    common,
    about,
    experience,
    projects,
    certifications,
    techstack,
    education,
    languages,
  ] = await Promise.all([
    getDictionary(lang, "common"),
    getDictionary(lang, "about"),
    getDictionary(lang, "experience"),
    getDictionary(lang, "projects"),
    getDictionary(lang, "certifications"),
    getDictionary(lang, "techstack"),
    getDictionary(lang, "education"),
    getDictionary(lang, "languages"),
  ]);

  return (
    <main className="flex flex-col items-center w-full relative">
      <Hero dict={common.hero} />
      <About dict={about} />
      <TechStack dict={techstack} />
      <Marquee dict={common} />
      <ExperienceJourney dict={experience} />
      <Projects dict={projects} />
      <Education dict={education} />
      <LanguageSection dict={languages} />
      <CertGrid dict={certifications} />
      <ContactForm dict={common.contact} />
    </main>
  );
}
