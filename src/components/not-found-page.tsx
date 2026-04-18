import NotFoundBackground from "./not-found/background";
import NotFoundHeader from "./not-found/header";
import NotFoundActions from "./not-found/actions";
import NotFoundInfoCards from "./not-found/info-cards";
import NotFoundIllustration from "./not-found/illustration";
import { CommonDict } from "@/types/i18n";

export default function NotFoundPage({ dict }: { dict: CommonDict }) {
  const { notFound } = dict;

  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] w-full items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      <NotFoundBackground />

      <section className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border/60 bg-card/70 p-6 shadow-[0_28px_100px_rgba(95,58,34,0.16)] backdrop-blur-xl sm:p-8 lg:p-12 dark:shadow-[0_28px_100px_rgba(0,0,0,0.34)]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <NotFoundHeader title={notFound.title} subtitle={notFound.subtitle} />
            <NotFoundActions buttonHome={notFound.buttonHome} buttonSwitch={notFound.buttonSwitch} />
            <NotFoundInfoCards 
              infoUrl={notFound.infoUrl} 
              infoUrlDesc={notFound.infoUrlDesc}
              infoNav={notFound.infoNav}
              infoNavDesc={notFound.infoNavDesc}
            />
          </div>

          <NotFoundIllustration />
        </div>
      </section>
    </main>
  );
}
