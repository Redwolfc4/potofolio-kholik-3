import { Suspense } from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Hero from "@/components/hero/hero";

// Dynamically import components below the fold
const About = dynamic(() => import("@/components/about/about"));
const TechStack = dynamic(() => import("@/components/techstack/techstack"));
const ExperienceJourney = dynamic(() => import("@/components/experience/experience"));
const Projects = dynamic(() => import("@/components/projects/projects"));
const Education = dynamic(() => import("@/components/education/education"));
const CertGrid = dynamic(() => import("@/components/certifications/certifications"));
const LanguageSection = dynamic(() => import("@/components/languages/languages"));
const Marquee = dynamic(() => import("@/components/companies/companies"));
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
      
      <Suspense fallback={<div className="h-96" />}>
        <About dict={about} />
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <TechStack dict={techstack} />
      </Suspense>

      <Suspense fallback={<div className="h-32" />}>
        <Marquee dict={common} />
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <ExperienceJourney dict={experience} />
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <Projects dict={projects} />
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <Education dict={education} />
      </Suspense>

      <Suspense fallback={<div className="h-64" />}>
        <LanguageSection dict={languages} />
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <CertGrid dict={certifications} />
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <ContactForm dict={common.contact} lang={lang} />
      </Suspense>
    </main>
  );
}
