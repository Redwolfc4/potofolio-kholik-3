import NotFoundPage from "@/components/not-found-page";
import { getDictionary } from "@/lib/i18n";
import { headers } from "next/headers";
import { Locale } from "@/types/i18n";

export default async function NotFound() {
  const locale = (await headers()).get("x-locale") as Locale || "en";
  const common = await getDictionary(locale, "common");

  return <NotFoundPage dict={common} />;
}
