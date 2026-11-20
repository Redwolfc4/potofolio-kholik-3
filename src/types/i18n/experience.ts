export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  period: string;
  startDate: string;
  endDate: string | null;
  location: string;
  description: string[];
  techStack: string[];
  logo?: string;
}

export interface ExperienceDict {
  title: string;
  viewDetails: string;
  showMore: string;
  showLess: string;
  responsibilities: string;
  techStack: string;
  items: ExperienceItem[];
}
