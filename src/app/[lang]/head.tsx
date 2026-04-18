import { defaultLocale, getDictionary, isValidLocale } from "@/lib/i18n";

type LangHeadProps = {
  params: Promise<{ lang: string }>;
};

export default async function Head({ params }: Readonly<LangHeadProps>) {
  const { lang } = await params;
  const safeLocale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(safeLocale, "common");
  const description = dict.metadata.description || dict.hero.description;
  const baseUrl = "https://salahudinkholikprasetyono.netlify.app";
  const pageUrl = `${baseUrl}/${safeLocale}`;

  return (
    <>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />
      <link rel="alternate" hrefLang="en-US" href={`${baseUrl}/en`} />
      <link rel="alternate" hrefLang="id-ID" href={`${baseUrl}/id`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/${defaultLocale}`} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
