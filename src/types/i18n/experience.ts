export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
  logo?: string;
}

export interface ExperienceDict {
  title: string;
  viewDetails: string;
  responsibilities: string;
  technologies: string;
  items: ExperienceItem[];
}
