import Hero from "@/components/hero/hero";
import About from "@/components/about/about";
import TechStack from "@/components/techstack/grid";
import ExperienceJourney from "@/components/experience/journey";
import Projects from "@/components/projects/projects";
import Education from "@/components/education/education";
import CertGrid from "@/components/certifications/cert-grid";
import Marquee from "@/components/companies/marquee";
import ContactForm from "@/components/contact/contact-form";
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
      <CertGrid dict={dict.certifications} />
      <ContactForm dict={dict.common.contact} />
    </main>
  );
}
