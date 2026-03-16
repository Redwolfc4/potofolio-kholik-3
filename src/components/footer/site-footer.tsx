"use client";

import { Instagram, Linkedin, Mail } from "lucide-react";

import { FooterDict } from "@/types/i18n";

export default function SiteFooter({ dict }: { dict: FooterDict }) {
  return (
    <footer className="w-full border-t border-border/80 bg-card/40 backdrop-blur">
      <div className="px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-primary">{dict.logo}</h3>
            <p className="text-sm text-muted-foreground">
              {dict.description}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/salahudin-kholik-prasetyono"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border/80 bg-card/80 p-2 text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary/80 hover:text-[#0A66C2]"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/kholikcipuden"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border/80 bg-card/80 p-2 text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary/80 hover:text-[#E4405F]"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/62895359530117"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border/80 bg-card/80 p-2 text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary/80 hover:text-[#25D366]"
              aria-label="WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.04 2.01c-5.5 0-9.98 4.48-9.98 9.98 0 1.76.46 3.48 1.33 5l-1.41 5.15 5.29-1.39c1.45.79 3.08 1.2 4.77 1.2 5.5 0 9.98-4.48 9.98-9.98 0-5.5-4.48-9.96-9.98-9.96zm5.84 14.45c-.24.68-1.39 1.3-1.91 1.38-.5.08-1.12.12-1.81-.12-.42-.13-.95-.31-1.64-.61-2.88-1.24-4.76-4.19-4.9-4.39-.14-.2-1.17-1.55-1.17-2.95 0-1.4.73-2.09.99-2.37.25-.28.56-.35.74-.35.18 0 .37 0 .53.01.17.01.4-.07.62.47.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.31.37-.45.5-.15.14-.3.29-.13.57.17.28.76 1.26 1.63 2.04 1.12 1 2.07 1.31 2.35 1.46.28.15.44.13.6-.08.16-.2.69-.81.88-1.09.19-.28.37-.23.62-.14.25.09 1.58.75 1.85.89.27.14.45.2.52.31.07.11.07.62-.17 1.3z" />
              </svg>
            </a>
            <a
              href="mailto:salahudinkoliq10@gmail.com"
              className="rounded-full border border-border/80 bg-card/80 p-2 text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary/80 hover:text-[#EA4335]"
              aria-label="Gmail"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="mt-6 text-xs text-muted-foreground">
          {dict.rights}
        </div>
      </div>
    </footer>
  );
}
