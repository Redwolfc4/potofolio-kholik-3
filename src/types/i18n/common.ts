export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderDict {
  logo: string;
  nav: NavItem[];
}

export interface HeroDict {
  tagline: string;
  name: string;
  description: string;
  image: {
    src: string;
    alt: string;
    fallbackSrc: string;
  };
  buttons: {
    cv: {
      label: string;
      image: {
        label: string;
        id: string;
        en: string;
      };
      plain: {
        label: string;
        id: string;
        en: string;
      };
    };
    projects: string;
  };
}

export interface ContactDict {
  title: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  send: string;
  sending: string;
  success: {
    title: string;
    message: string;
    button: string;
  };
  error: string;
}

export interface FooterDict {
  logo: string;
  description: string;
  rights: string;
}

export interface CommonDict {
  metadata: {
    title: string;
    description: string;
  };
  header: HeaderDict;
  hero: HeroDict;
  titles: {
    marquee: string;
  };
  contact: ContactDict;
  footer: FooterDict;
}
